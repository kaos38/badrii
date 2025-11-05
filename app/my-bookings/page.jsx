'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const { language, toggleLanguage } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings/my-bookings');
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth/login');
          return;
        }
        throw new Error(data.error || 'Failed to fetch bookings');
      }
      
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'ALL') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    completed: bookings.filter((b) => b.status === 'COMPLETED').length,
  };

  return (
    <div className="min-h-screen bg-[#FFF8DC]">
      {/* Header */}
      <div className="bg-[#8B4513] text-[#FFF8DC] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === 'en' ? 'My Bookings' : 'मेरी बुकिंग'}
              </h1>
              <p className="text-xl opacity-90">
                {language === 'en' 
                  ? 'View and manage your temple service bookings' 
                  : 'अपनी मंदिर सेवा बुकिंग देखें और प्रबंधित करें'}
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
            <p className="mt-4 text-[#654321]">
              {language === 'en' ? 'Loading bookings...' : 'बुकिंग लोड हो रही है...'}
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 border-2 border-[#D4AF37] text-center">
                <div className="text-3xl font-bold text-[#8B4513]">{stats.total}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Total' : 'कुल'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-green-300 text-center">
                <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Confirmed' : 'पुष्टि'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-yellow-300 text-center">
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Pending' : 'लंबित'}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border-2 border-blue-300 text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.completed}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {language === 'en' ? 'Completed' : 'पूर्ण'}
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
              <div className="flex flex-wrap gap-2">
                {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      filter === status
                        ? 'bg-[#8B4513] text-[#FFF8DC]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'ALL' ? (language === 'en' ? 'All' : 'सभी') : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
                  {language === 'en' ? 'No bookings found' : 'कोई बुकिंग नहीं मिली'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'en' 
                    ? 'You haven\'t made any bookings yet. Book your first service now!' 
                    : 'आपने अभी तक कोई बुकिंग नहीं की है। अभी अपनी पहली सेवा बुक करें!'}
                </p>
                <button
                  onClick={() => router.push('/services')}
                  className="px-6 py-3 bg-[#8B4513] text-[#FFF8DC] rounded-lg font-semibold hover:bg-[#654321] transition-colors"
                >
                  {language === 'en' ? 'Browse Services' : 'सेवाएं देखें'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Left Side - Service Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-3xl">🕉️</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-[#8B4513] mb-1">
                                {language === 'en' ? booking.service.nameEn : booking.service.nameHi}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                  {booking.paymentStatus}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div>
                                  <span className="font-semibold">{language === 'en' ? 'Date:' : 'तारीख:'}</span>
                                  <br />
                                  {formatDate(booking.bookingDate)}
                                </div>
                                <div>
                                  <span className="font-semibold">{language === 'en' ? 'Time:' : 'समय:'}</span>
                                  <br />
                                  {booking.bookingTime}
                                </div>
                                <div>
                                  <span className="font-semibold">{language === 'en' ? 'Duration:' : 'अवधि:'}</span>
                                  <br />
                                  {booking.service.duration} {language === 'en' ? 'min' : 'मिनट'}
                                </div>
                                <div>
                                  <span className="font-semibold">{language === 'en' ? 'Amount:' : 'राशि:'}</span>
                                  <br />
                                  <span className="text-lg font-bold text-[#8B4513]">
                                    {formatPrice(booking.amount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Actions */}
                        <div className="flex flex-col gap-2 md:w-48">
                          {booking.payment && booking.payment.receiptUrl && (
                            <a
                              href={booking.payment.receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#8B4513] text-[#FFF8DC] text-center rounded-lg font-semibold hover:bg-[#654321] transition-colors"
                            >
                              {language === 'en' ? '📄 Download Receipt' : '📄 रसीद डाउनलोड'}
                            </a>
                          )}
                          {booking.payment && booking.payment.receiptNumber && (
                            <div className="px-4 py-2 bg-gray-100 rounded-lg text-center">
                              <p className="text-xs text-gray-500">
                                {language === 'en' ? 'Receipt No.' : 'रसीद नं.'}
                              </p>
                              <p className="text-xs font-mono font-semibold text-gray-700">
                                {booking.payment.receiptNumber}
                              </p>
                            </div>
                          )}
                          <div className="text-xs text-gray-500 text-center">
                            {language === 'en' ? 'Booked on:' : 'बुक किया गया:'}
                            <br />
                            {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">{language === 'en' ? 'Notes:' : 'नोट्स:'}</span> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
