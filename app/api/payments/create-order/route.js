// Create Razorpay Order API
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';
import { createRazorpayOrder, generateReceiptNumber } from '@/lib/razorpay';
import { z } from 'zod';

// Validation schema
const createOrderSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  bookingDate: z.string().min(1, 'Booking date is required'),
  bookingTime: z.string().min(1, 'Booking time is required'),
  notes: z.string().optional(),
});

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.user.id;
    const body = await request.json();

    // Validate input
    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { serviceId, bookingDate, bookingTime, notes } = validation.data;

    // Fetch service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    if (!service.isActive) {
      return NextResponse.json(
        { success: false, error: 'Service is not available' },
        { status: 400 }
      );
    }

    // Check if slot is available
    const bookingDateObj = new Date(bookingDate);
    const existingBooking = await prisma.booking.findFirst({
      where: {
        serviceId,
        bookingDate: bookingDateObj,
        bookingTime,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { success: false, error: 'This time slot is already booked' },
        { status: 400 }
      );
    }

    // Create booking record
    const booking = await prisma.booking.create({
      data: {
        userId,
        serviceId,
        bookingDate: bookingDateObj,
        bookingTime,
        amount: service.price,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        notes,
      },
      include: {
        service: true,
        user: true,
      },
    });

    // Generate receipt number
    const receiptNumber = generateReceiptNumber('BKG');

    // Create Razorpay order
    const orderResult = await createRazorpayOrder(
      service.price,
      receiptNumber,
      {
        bookingId: booking.id,
        userId,
        serviceName: service.nameEn,
      }
    );

    if (!orderResult.success) {
      // Delete booking if order creation fails
      await prisma.booking.delete({ where: { id: booking.id } });
      
      return NextResponse.json(
        { success: false, error: 'Failed to create payment order' },
        { status: 500 }
      );
    }

    // Update booking with payment order ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentId: orderResult.order.id,
      },
    });

    // Return order details for frontend
    return NextResponse.json({
      success: true,
      order: {
        id: orderResult.order.id,
        amount: orderResult.order.amount,
        currency: orderResult.order.currency,
      },
      booking: {
        id: booking.id,
        serviceName: service.nameEn,
        serviceNameHi: service.nameHi,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        amount: booking.amount,
      },
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
