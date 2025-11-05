// Razorpay Webhook Handler
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * Verify Razorpay webhook signature
 */
function verifyWebhookSignature(body, signature, secret) {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-razorpay-signature');

    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 400 }
        );
      }
    }

    const event = body.event;
    const payload = body.payload;

    console.log('Received webhook event:', event);

    switch (event) {
      case 'payment.authorized':
        await handlePaymentAuthorized(payload);
        break;

      case 'payment.captured':
        await handlePaymentCaptured(payload);
        break;

      case 'payment.failed':
        await handlePaymentFailed(payload);
        break;

      case 'order.paid':
        await handleOrderPaid(payload);
        break;

      case 'refund.created':
        await handleRefundCreated(payload);
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle payment.authorized event
 */
async function handlePaymentAuthorized(payload) {
  const payment = payload.payment.entity;
  const paymentId = payment.id;
  const orderId = payment.order_id;

  console.log('Payment authorized:', paymentId);

  // Find booking by order ID
  const booking = await prisma.booking.findFirst({
    where: { paymentId: orderId },
  });

  if (booking) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
      },
    });
  }
}

/**
 * Handle payment.captured event
 */
async function handlePaymentCaptured(payload) {
  const payment = payload.payment.entity;
  const paymentId = payment.id;
  
  console.log('Payment captured:', paymentId);

  // Update payment record if exists
  const existingPayment = await prisma.payment.findFirst({
    where: { gatewayPaymentId: paymentId },
  });

  if (existingPayment) {
    await prisma.payment.update({
      where: { id: existingPayment.id },
      data: { status: 'SUCCESS' },
    });
  }
}

/**
 * Handle payment.failed event
 */
async function handlePaymentFailed(payload) {
  const payment = payload.payment.entity;
  const orderId = payment.order_id;

  console.log('Payment failed:', payment.id);

  // Find and update booking
  const booking = await prisma.booking.findFirst({
    where: { paymentId: orderId },
  });

  if (booking) {
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: 'FAILED',
        status: 'CANCELLED',
      },
    });

    // Create failed payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: booking.userId,
        amount: booking.amount,
        currency: 'INR',
        paymentMethod: payment.method || 'unknown',
        paymentGateway: 'RAZORPAY',
        gatewayPaymentId: payment.id,
        gatewayOrderId: orderId,
        status: 'FAILED',
      },
    });
  }
}

/**
 * Handle order.paid event
 */
async function handleOrderPaid(payload) {
  const order = payload.order.entity;
  const orderId = order.id;

  console.log('Order paid:', orderId);

  // Additional order processing if needed
}

/**
 * Handle refund.created event
 */
async function handleRefundCreated(payload) {
  const refund = payload.refund.entity;
  const paymentId = refund.payment_id;

  console.log('Refund created:', refund.id);

  // Update payment record
  const payment = await prisma.payment.findFirst({
    where: { gatewayPaymentId: paymentId },
  });

  if (payment) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'REFUNDED' },
    });

    // Update booking
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: {
        paymentStatus: 'REFUNDED',
        status: 'CANCELLED',
      },
    });
  }
}
