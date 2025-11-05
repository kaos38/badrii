// Razorpay Configuration and Utilities
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_SECRET || '',
});

/**
 * Create Razorpay Order
 * @param {number} amount - Amount in rupees (will be converted to paise)
 * @param {string} receiptId - Unique receipt ID
 * @param {object} notes - Additional notes
 * @returns {Promise<object>} - Razorpay order object
 */
export async function createRazorpayOrder(amount, receiptId, notes = {}) {
  try {
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: receiptId,
      notes: notes,
    };

    const order = await razorpay.orders.create(options);
    return {
      success: true,
      order,
    };
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Verify Razorpay Payment Signature
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - Razorpay signature
 * @returns {boolean} - Whether signature is valid
 */
export function verifyPaymentSignature(orderId, paymentId, signature) {
  try {
    const text = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(text)
      .digest('hex');

    return generatedSignature === signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Fetch Payment Details
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<object>} - Payment details
 */
export async function fetchPaymentDetails(paymentId) {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return {
      success: true,
      payment,
    };
  } catch (error) {
    console.error('Fetch payment error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Refund Payment
 * @param {string} paymentId - Razorpay payment ID
 * @param {number} amount - Amount to refund (in rupees)
 * @returns {Promise<object>} - Refund result
 */
export async function refundPayment(paymentId, amount = null) {
  try {
    const options = amount ? { amount: Math.round(amount * 100) } : {};
    const refund = await razorpay.payments.refund(paymentId, options);
    
    return {
      success: true,
      refund,
    };
  } catch (error) {
    console.error('Refund error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate Receipt Number
 * @param {string} prefix - Prefix for receipt (e.g., 'BKG', 'SRV')
 * @returns {string} - Unique receipt number
 */
export function generateReceiptNumber(prefix = 'KUBER') {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Format amount for display
 * @param {number} amount - Amount in rupees
 * @returns {string} - Formatted amount
 */
export function formatAmount(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate GST (18%)
 * @param {number} amount - Base amount
 * @returns {object} - Amount breakdown with GST
 */
export function calculateGST(amount) {
  const gstRate = 0.18;
  const baseAmount = amount / (1 + gstRate);
  const gstAmount = amount - baseAmount;
  
  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    totalAmount: amount,
  };
}
