'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated, getSession } from '@/lib/auth';
import { getUserPurchases } from '@/lib/aarti-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function MyAartisPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    const currentUser = getSession();
    setUser(currentUser);
    
    // Load user's purchases
    const userPurchases = getUserPurchases(currentUser.id);
    setPurchases(userPurchases);
  }, [router]);

  const handleWatchVideo = (service) => {
    setSelectedVideo(service);
    setShowVideoModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
        <div className="text-xl text-incense font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-cream">
      {/* Header - Heritage */}
      <div className="bg-ivory border-b border-sandalwood/10 py-16 relative">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Language Switcher */}
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              ॐ
            </div>
            <h1 className="text-5xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {t('dashboard.title')}
            </h1>
            <p className="text-lg text-incense font-light max-w-2xl mx-auto">
              {t('dashboard.welcome')}, {user.name}! {t('dashboard.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {purchases.length === 0 ? (
          // Empty State - Heritage
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-sm bg-ivory border border-sandalwood/15 shadow-sm mb-6">
              <svg className="w-16 h-16 text-sandalwood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-light text-deep-brown mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {t('dashboard.noBookings')}
            </h2>
            <p className="text-incense font-light mb-8 max-w-md mx-auto">
              {t('dashboard.noBookingsDesc')}
            </p>
            <Link
              href="/aarti-pooja"
              className="inline-block bg-sandalwood text-ivory px-8 py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood"
              style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
            >
              {t('dashboard.browseServices')}
            </Link>
          </div>
        ) : (
          <>
            {/* Stats - Heritage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-ivory rounded-sm p-6 shadow-sm border border-sandalwood/15">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-incense text-xs mb-1 font-light">{t('dashboard.totalBookings')}</p>
                    <p className="text-4xl font-light text-sandalwood" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>{purchases.length}</p>
                  </div>
                  <div className="w-14 h-14 bg-sandalwood/10 rounded-sm flex items-center justify-center text-sandalwood text-2xl">
                    ॐ
                  </div>
                </div>
              </div>

              <div className="bg-ivory rounded-sm p-6 shadow-sm border border-sandalwood/15">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-incense text-xs mb-1 font-light">{t('dashboard.videosAvailable')}</p>
                    <p className="text-4xl font-light text-sandalwood" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>{purchases.length}</p>
                  </div>
                  <div className="w-14 h-14 bg-sandalwood/10 rounded-sm flex items-center justify-center">
                    <svg className="w-7 h-7 text-sandalwood" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-ivory rounded-sm p-6 shadow-sm border border-sandalwood/15">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-incense text-xs mb-1 font-light">{t('dashboard.lastBooking')}</p>
                    <p className="text-lg font-light text-sandalwood">
                      {formatDate(purchases[purchases.length - 1].purchaseDate).split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-sandalwood/10 rounded-sm flex items-center justify-center">
                    <svg className="w-7 h-7 text-sandalwood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchases Grid - Heritage */}
            <div className="mb-8">
              <h2 className="text-3xl font-light text-deep-brown mb-6" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {language === 'hi' ? 'आपके बुक किए गए समारोह' : 'Your Booked Ceremonies'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-ivory rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-sandalwood/15"
                  >
                    <div className="relative h-56">
                      <Image
                        src={purchase.service.image}
                        alt={purchase.service.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.src = '/images/temple/default.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-ivory text-lg font-light mb-1" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                          {purchase.service.title}
                        </h3>
                        <p className="text-ivory/90 text-xs font-light">
                          {t('dashboard.bookedOn')} {formatDate(purchase.purchaseDate)}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-light text-incense bg-sandalwood/5 px-3 py-1 rounded-sm border border-sandalwood/10">
                          {purchase.service.category}
                        </span>
                        <span className="text-lg font-light text-sandalwood">
                          ₹{purchase.service.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleWatchVideo(purchase.service)}
                        className="w-full bg-sandalwood text-ivory py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood flex items-center justify-center"
                        style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        {t('dashboard.watchNow')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to browse more - Heritage */}
            <div className="text-center bg-ivory rounded-sm p-8 shadow-sm border border-sandalwood/15">
              <h3 className="text-2xl font-light text-deep-brown mb-4" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                {t('dashboard.exploreMore')}
              </h3>
              <p className="text-incense font-light mb-6">
                {t('dashboard.exploreDesc')}
              </p>
              <Link
                href="/aarti-pooja"
                className="inline-block bg-sandalwood text-ivory px-8 py-3 rounded-sm font-light hover:bg-deep-brown transition-all duration-300 shadow-sm border border-sandalwood"
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
              >
                {t('dashboard.browseMore')}
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Video Modal - Heritage */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-deep-brown/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-deep-brown rounded-sm max-w-5xl w-full shadow-lg overflow-hidden border border-sandalwood/20">
            <div className="bg-sandalwood/20 p-6 flex items-center justify-between border-b border-sandalwood/20">
              <div>
                <h2 className="text-xl font-light text-ivory mb-1" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                  {selectedVideo.title}
                </h2>
                <p className="text-ivory/70 text-sm font-light">{selectedVideo.category}</p>
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedVideo(null);
                }}
                className="bg-ivory/10 backdrop-blur-sm p-2 rounded-sm hover:bg-ivory/20 transition-colors text-ivory"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
                poster={selectedVideo.image}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-sandalwood/20 p-6 border-t border-sandalwood/20">
              <p className="text-ivory/90 text-sm font-light">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
