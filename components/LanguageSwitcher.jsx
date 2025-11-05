'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-[#2D1810]/5 rounded-full p-1 border border-[#8B4513]/10">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-[#8B4513] text-white shadow-sm'
            : 'text-[#5A3825] hover:bg-[#2D1810]/5'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLang('hi')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'hi'
            ? 'bg-[#8B4513] text-white shadow-sm'
            : 'text-[#5A3825] hover:bg-[#2D1810]/5'
        }`}
        aria-label="हिंदी में स्विच करें"
      >
        हिं
      </button>
    </div>
  );
}
