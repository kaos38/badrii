// Get User Bookings API
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';

export async function GET(request) {
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

    // Fetch user's bookings
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        service: {
          select: {
            nameEn: true,
            nameHi: true,
            price: true,
            duration: true,
            category: true,
            imageUrl: true,
          },
        },
        payment: {
          select: {
            receiptNumber: true,
            receiptUrl: true,
            status: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      bookings: bookings.map((booking) => ({
        id: booking.id,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        amount: booking.amount,
        notes: booking.notes,
        createdAt: booking.createdAt,
        service: booking.service,
        payment: booking.payment,
      })),
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
