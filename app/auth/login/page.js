'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser, saveSession, isAuthenticated } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated()) {
      router.push('/aarti-pooja');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = loginUser(formData.email, formData.password);

    if (result.success) {
      saveSession(result.user);
      router.push('/aarti-pooja');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-cream py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle heritage pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='24' fill='%238B4513'%3Eॐ%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Language Switcher */}
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        {/* Minimal Om Symbol */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="text-6xl text-sandalwood opacity-90" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>
              ॐ
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light text-deep-brown tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {t('auth.welcomeBack')}
            </h2>
            <p className="mt-2 text-sm text-incense font-light">
              {t('auth.signInSubtitle')}
            </p>
          </div>
        </div>

        {/* Demo Credentials Card - Minimal */}
        <div className="bg-ivory/50 border border-sandalwood/10 rounded-sm p-4">
          <p className="text-xs font-light text-sandalwood mb-2">{t('auth.demoCredentials')}</p>
          <div className="space-y-1 text-xs text-incense font-light">
            <p><strong>Email:</strong> user@temple.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>

        {/* Login Form - Minimal & Clean */}
        <div className="bg-ivory border border-sandalwood/15 rounded-sm p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50/50 border border-red-300/30 text-red-700 px-4 py-3 rounded-sm text-sm font-light">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-sandalwood/20 placeholder-stone/50 text-deep-brown rounded-sm focus:outline-none focus:ring-1 focus:ring-sandalwood focus:border-sandalwood transition-all bg-heritage-bg/30"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-light text-deep-brown mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border border-sandalwood/20 placeholder-stone/50 text-deep-brown rounded-sm focus:outline-none focus:ring-1 focus:ring-sandalwood focus:border-sandalwood transition-all bg-heritage-bg/30"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-sandalwood text-base font-light rounded-sm text-ivory bg-sandalwood hover:bg-deep-brown focus:outline-none focus:ring-1 focus:ring-sandalwood transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}
              >
                {isLoading ? t('auth.signingIn') : t('auth.signIn')}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center border-t border-sandalwood/10 pt-6">
            <p className="text-sm text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
              {t('auth.dontHaveAccount')}{' '}
              <Link 
                href="/auth/signup" 
                className="font-normal text-sandalwood hover:text-deep-brown transition-colors underline"
              >
                {t('auth.signUpHere')}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home - Minimal */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-incense hover:text-sandalwood transition-colors font-light inline-flex items-center gap-2"
            style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}
          >
            <span>←</span> {t('auth.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
