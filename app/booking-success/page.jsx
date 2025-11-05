'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const receiptNumber = searchParams.get('receipt');

  return (
    <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-2xl p-8 border-4 border-[#D4AF37]">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
            🙏 Booking Confirmed! 🙏
          </h1>
          <p className="text-[#654321]">
            Your payment was successful and booking is confirmed
          </p>
        </div>

        {/* Receipt Number */}
        {receiptNumber && (
          <div className="bg-[#FFF8DC] border-2 border-[#D4AF37] rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-[#654321] mb-2">Receipt Number</p>
              <p className="text-2xl font-bold text-[#8B4513] font-mono tracking-wider">
                {receiptNumber}
              </p>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#8B4513] mb-4">📧 What's Next?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#8B4513] mr-2">✓</span>
              <span>A confirmation email has been sent to your registered email address</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B4513] mr-2">✓</span>
              <span>Your receipt is available in "My Bookings" section</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B4513] mr-2">✓</span>
              <span>Please arrive 10 minutes before your scheduled time</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#8B4513] mr-2">✓</span>
              <span>Carry a copy of your booking receipt (digital or printed)</span>
            </li>
          </ul>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Note
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                Please save your receipt number for future reference. You can download the PDF receipt from your bookings page.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/my-bookings"
            className="flex-1 px-6 py-3 bg-[#8B4513] text-[#FFF8DC] text-center rounded-lg font-semibold hover:bg-[#654321] transition-colors"
          >
            View My Bookings
          </Link>
          <Link 
            href="/"
            className="flex-1 px-6 py-3 border-2 border-[#8B4513] text-[#8B4513] text-center rounded-lg font-semibold hover:bg-[#FFF8DC] transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Blessing */}
        <div className="mt-8 text-center">
          <p className="text-[#654321] italic">
            "May Lord Kuber bless you with prosperity and happiness"
          </p>
          <p className="text-[#654321] mt-2">
            🕉️ हर हर महादेव 🕉️
          </p>
        </div>
      </div>
    </div>
  );
}
