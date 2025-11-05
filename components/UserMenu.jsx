// components/UserMenu.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Calendar as CalendarIcon, Video as VideoIcon, LogOut as LogOutIcon, LogIn as LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';



export default function UserMenu({ user, onLogout, language = 'en', t }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target)) return;
      if (buttonRef.current?.contains(e.target )) return;
      setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-sandalwood/30 text-deep-brown hover:bg-sandalwood/10 focus:outline-none focus:ring-2 focus:ring-sandalwood"
      >
        <UserIcon className="h-5 w-5 text-sandalwood" />
      </button>

      {/* Dropdown panel */}
      <div
        ref={menuRef}
        className={`origin-top-right transition transform ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        } absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-xl border border-sandalwood/20 z-50`}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="py-1">
          {user ? (
            <>
              <div className="px-4 py-2 border-b border-sandalwood/10">
                <p className="text-sm font-medium text-deep-brown">{user.name ?? user.email}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/my-bookings');
                }}
                className="w-full text-left px-4 py-2 hover:bg-sandalwood/5 flex items-center gap-2 text-sm"
              >
                <CalendarIcon className="h-4 w-4 text-sandalwood" />
                {language === 'en' ? 'My Bookings' : 'मेरी बुकिंग'}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/my-aartis');
                }}
                className="w-full text-left px-4 py-2 hover:bg-sandalwood/5 flex items-center gap-2 text-sm"
              >
                <VideoIcon className="h-4 w-4 text-sandalwood" />
                {t ? t('nav.myAartis') : 'My Aartis'}
              </button>

              <div className="border-t border-sandalwood/10" />

              <button
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 text-sm"
              >
                <LogOutIcon className="h-4 w-4" />
                {t ? t('nav.logout') : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/auth/login');
                }}
                className="w-full text-left px-4 py-2 hover:bg-sandalwood/5 flex items-center gap-2 text-sm"
              >
                <LogInIcon className="h-4 w-4 text-sandalwood" />
                {t ? t('nav.login') : 'Login'}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push('/auth/signup');
                }}
                className="w-full text-left px-4 py-2 hover:bg-sandalwood/5 flex items-center gap-2 text-sm"
              >
                <UserIcon className="h-4 w-4 text-sandalwood" />
                {t ? t('auth.signUp') : 'Sign Up'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
