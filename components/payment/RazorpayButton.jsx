'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Razorpay Payment Button Component
 */
export default function RazorpayButton({ 
  serviceId, 
  serviceName,
  serviceNameHi,
  amount, 
  bookingDate, 
  bookingTime,
  notes = '',
  onSuccess,
  onError,
  className = '',
  children 
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          bookingDate,
          bookingTime,
          notes,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      // Configure Razorpay options
      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'KuberJi Mandir',
        description: `${serviceName} (${serviceNameHi})`,
        image: '/icons/om-symbol.png',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: orderData.booking.id,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            // Success callback
            if (onSuccess) {
              onSuccess(verifyData);
            } else {
              // Default: redirect to success page
              router.push(`/booking-success?receipt=${verifyData.payment.receiptNumber}`);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            if (onError) {
              onError(error);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          bookingId: orderData.booking.id,
          serviceName: serviceName,
        },
        theme: {
          color: '#8B4513', // Brown color matching heritage theme
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        if (onError) {
          onError(response.error);
        } else {
          alert(`Payment failed: ${response.error.description}`);
        }
        setLoading(false);
      });

      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      
      if (onError) {
        onError(error);
      } else {
        alert(error.message || 'Payment initialization failed');
      }
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`
        px-6 py-3 rounded-lg font-semibold
        bg-[#8B4513] text-[#FFF8DC] hover:bg-[#654321]
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        children || `Pay ₹${amount}`
      )}
    </button>
  );
}
