'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RazorpayButton from '@/components/payment/RazorpayButton';

export default function BookServicePage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      
      if (data.success) {
        const foundService = data.services.find(s => s.id === serviceId);
        setService(foundService);
      }
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center">
        <div className="text-2xl text-[#8B4513]">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FFF8DC] flex items-center justify-center">
        <div className="text-2xl text-[#8B4513]">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#8B4513] mb-2">
            {language === 'en' ? 'Book Service' : 'सेवा बुक करें'}
          </h1>
          <p className="text-[#654321]">
            {language === 'en' ? 'Complete your booking details' : 'अपनी बुकिंग विवरण पूर्ण करें'}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="px-4 py-2 bg-[#8B4513] text-[#FFF8DC] rounded-lg hover:bg-[#654321] transition-colors"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-[#D4AF37]">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
              {language === 'en' ? service.nameEn : service.nameHi}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#654321] mb-2">
                  {language === 'en' ? 'Description' : 'विवरण'}
                </h3>
                <p className="text-gray-700">
                  {language === 'en' ? service.descriptionEn : service.descriptionHi}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#654321] mb-2">
                  {language === 'en' ? 'Benefits' : 'लाभ'}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {(language === 'en' ? service.benefitsEn : service.benefitsHi).map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-[#654321] font-semibold">
                    {language === 'en' ? 'Duration' : 'अवधि'}:
                  </span>
                  <span className="text-gray-700">{service.duration} {language === 'en' ? 'minutes' : 'मिनट'}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#654321] font-semibold">
                    {language === 'en' ? 'Price' : 'मूल्य'}:
                  </span>
                  <span className="text-2xl font-bold text-[#8B4513]">₹{service.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-[#D4AF37]">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
              {language === 'en' ? 'Booking Details' : 'बुकिंग विवरण'}
            </h2>

            <div className="space-y-4">
              {/* Date Picker */}
              <div>
                <label className="block text-[#654321] font-semibold mb-2">
                  {language === 'en' ? 'Select Date' : 'तिथि चुनें'} *
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  required
                />
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-[#654321] font-semibold mb-2">
                  {language === 'en' ? 'Select Time' : 'समय चुनें'} *
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  required
                >
                  <option value="">
                    {language === 'en' ? 'Choose a time slot' : 'समय स्लॉट चुनें'}
                  </option>
                  {service.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[#654321] font-semibold mb-2">
                  {language === 'en' ? 'Additional Notes (Optional)' : 'अतिरिक्त नोट्स (वैकल्पिक)'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder={language === 'en' ? 'Any special requirements...' : 'कोई विशेष आवश्यकता...'}
                />
              </div>

              {/* Payment Button */}
              <div className="pt-4">
                {bookingDate && bookingTime ? (
                  <RazorpayButton
                    serviceId={service.id}
                    serviceName={service.nameEn}
                    serviceNameHi={service.nameHi}
                    amount={service.price}
                    bookingDate={bookingDate}
                    bookingTime={bookingTime}
                    notes={notes}
                    className="w-full"
                  >
                    {language === 'en' ? `Proceed to Payment - ₹${service.price}` : `भुगतान के लिए आगे बढ़ें - ₹${service.price}`}
                  </RazorpayButton>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    {language === 'en' ? 'Please select date and time' : 'कृपया तारीख और समय चुनें'}
                  </button>
                )}
              </div>

              {/* Info Note */}
              <p className="text-sm text-gray-600 text-center">
                {language === 'en' 
                  ? '🔒 Secure payment powered by Razorpay' 
                  : '🔒 Razorpay द्वारा सुरक्षित भुगतान'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
