'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const { language, toggleLanguage } = useLanguage();

  const categories = [
    { value: 'ALL', labelEn: 'All Services', labelHi: 'सभी सेवाएं' },
    { value: 'DAILY_AARTI', labelEn: 'Daily Aarti', labelHi: 'दैनिक आरती' },
    { value: 'SPECIAL_POOJA', labelEn: 'Special Pooja', labelHi: 'विशेष पूजा' },
    { value: 'GRAND_CEREMONY', labelEn: 'Grand Ceremony', labelHi: 'भव्य समारोह' },
    { value: 'SEVA', labelEn: 'Seva', labelHi: 'सेवा' },
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'ALL' 
        ? '/api/services?active=true'
        : `/api/services?category=${selectedCategory}&active=true`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <div className="bg-[#8B4513] text-[#FFF8DC] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === 'en' ? 'Temple Services' : 'मंदिर सेवाएं'}
              </h1>
              <p className="text-xl opacity-90">
                {language === 'en' 
                  ? 'Book your divine experience with us' 
                  : 'हमारे साथ अपने दिव्य अनुभव को बुक करें'}
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-[#FFF8DC] text-[#8B4513] rounded-lg hover:bg-[#F5E6D3] transition-colors font-semibold"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-[#8B4513] text-[#FFF8DC]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'en' ? category.labelEn : category.labelHi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
            <p className="mt-4 text-[#654321]">
              {language === 'en' ? 'Loading services...' : 'सेवाएं लोड हो रही हैं...'}
            </p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-[#654321]">
              {language === 'en' ? 'No services found' : 'कोई सेवा नहीं मिली'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#D4AF37] hover:shadow-xl transition-shadow duration-300"
              >
                {/* Service Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#8B4513] to-[#654321] flex items-center justify-center">
                  <span className="text-6xl">🕉️</span>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#FFF8DC] text-[#8B4513] text-xs font-semibold rounded-full">
                      {service.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                    {language === 'en' ? service.nameEn : service.nameHi}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {language === 'en' ? service.descriptionEn : service.descriptionHi}
                  </p>

                  {/* Benefits */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-[#654321] mb-2">
                      {language === 'en' ? 'Benefits:' : 'लाभ:'}
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {(language === 'en' ? service.benefitsEn : service.benefitsHi)
                        .slice(0, 2)
                        .map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#8B4513] mr-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Duration and Price */}
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Duration' : 'अवधि'}
                      </p>
                      <p className="text-sm font-semibold text-[#654321]">
                        {service.duration} {language === 'en' ? 'min' : 'मिनट'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Price' : 'मूल्य'}
                      </p>
                      <p className="text-2xl font-bold text-[#8B4513]">
                        {formatPrice(service.price)}
                      </p>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <Link
                    href={`/book-service?serviceId=${service.id}`}
                    className="block w-full px-6 py-3 bg-[#8B4513] text-[#FFF8DC] text-center rounded-lg font-semibold hover:bg-[#654321] transition-colors"
                  >
                    {language === 'en' ? 'Book Now' : 'अभी बुक करें'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-3">🙏</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'Easy Booking' : 'आसान बुकिंग'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Book your service online in just a few clicks' 
                  : 'बस कुछ क्लिक में अपनी सेवा ऑनलाइन बुक करें'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'Secure Payment' : 'सुरक्षित भुगतान'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Safe and secure payment gateway powered by Razorpay' 
                  : 'Razorpay द्वारा संचालित सुरक्षित भुगतान गेटवे'}
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="text-lg font-bold text-[#8B4513] mb-2">
                {language === 'en' ? 'Instant Confirmation' : 'तत्काल पुष्टि'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Get instant booking confirmation and receipt via email' 
                  : 'ईमेल के माध्यम से तत्काल बुकिंग पुष्टि और रसीद प्राप्त करें'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
