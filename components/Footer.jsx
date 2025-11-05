'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-deep-brown text-ivory pt-12 pb-6 border-t border-sandalwood/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temple Information */}
          <div>
            <h3 className="text-2xl font-light text-ivory mb-4 tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'कुबेरजी मंदिर पांडुकेश्वर' : 'KuberJi Mandir Pandukeshwar'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-ivory" size={18} />
                <p className="font-light text-sm text-ivory/90" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {language === 'hi' 
                    ? 'कुबेरजी मंदिर, पांडुकेश्वर, बद्रीनाथ के पास, उत्तराखंड'
                    : 'KuberJi Mandir, Pandukeshwar, Near Badrinath, Uttarakhand'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-ivory" size={18} />
                <p className="font-light text-sm text-ivory/90">(123) 456-7890</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-ivory" size={18} />
                <p className="font-light text-sm text-ivory/90">info@kuberjitemple.org</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-light text-sm text-ivory mb-3" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {language === 'hi' ? 'हमें फॉलो करें' : 'Follow Us'}
              </h4>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/icons/facebook-48.svg" alt="Facebook" width={36} height={36} />
                </a>
                <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/icons/instagram-48.svg" alt="Instagram" width={36} height={36} />
                </a>
                <a href="#" aria-label="YouTube" className="opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/icons/youtube-48.svg" alt="YouTube" width={36} height={36} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-light text-ivory mb-4 tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 font-light text-sm">
              <li>
                <Link href="/about" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link href="/aarti-pooja" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.aarti')}
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-ivory/80 hover:text-sandalwood transition-colors" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                  {t('nav.shop')}
                </Link>
              </li>
            </ul>
          </div>
        
          {/* Temple Hours */}
          <div>
            <h3 className="text-xl font-light text-ivory mb-4 tracking-wide" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
              {language === 'hi' ? 'मंदिर समय' : 'Temple Hours'}
            </h3>
            <div className="space-y-2 font-light text-sm text-ivory/90" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'सोमवार - शुक्रवार:' : 'Monday - Friday:'}</span>
              </div>
              <div className="pl-4 text-xs">
                {language === 'hi' ? 'सुबह 7:00 - दोपहर 12:00' : '7:00 AM - 12:00 PM'}<br />
                {language === 'hi' ? 'शाम 5:00 - रात 8:00' : '5:00 PM - 8:00 PM'}
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'शनिवार:' : 'Saturday:'}</span>
              </div>
              <div className="pl-4 text-xs">
                {language === 'hi' ? 'सुबह 7:00 - दोपहर 12:00' : '7:00 AM - 12:00 PM'}<br />
                {language === 'hi' ? 'शाम 4:00 - रात 9:00' : '4:00 PM - 9:00 PM'}
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'रविवार:' : 'Sunday:'}</span>
              </div>
              <div className="pl-4 text-xs">
                {language === 'hi' ? 'सुबह 7:00 - रात 9:00' : '7:00 AM - 9:00 PM'}
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-light text-sm text-ivory mb-2" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {language === 'hi' ? 'विशेष आरती समय' : 'Special Aarti Times'}
              </h4>
              <p className="font-light text-sm text-ivory/90" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {language === 'hi' ? 'प्रातः आरती: सुबह 8:00' : 'Morning Aarti: 8:00 AM'}
              </p>
              <p className="font-light text-sm text-ivory/90" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
                {language === 'hi' ? 'संध्या आरती: शाम 7:00' : 'Evening Aarti: 7:00 PM'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-sandalwood/20 text-center">
          <p className="font-light text-sm text-ivory/70" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' 
              ? `© ${currentYear} कुबेरजी मंदिर पांडुकेश्वर। सर्वाधिकार सुरक्षित।`
              : `© ${currentYear} KuberJi Mandir Pandukeshwar. All Rights Reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
