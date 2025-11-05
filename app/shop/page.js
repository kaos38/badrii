"use client";
import Footer from '@/components/Footer';
import { motion } from "framer-motion";
import MyNav from '@/components/MyNav';
import Image from 'next/image';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Shop() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const products = [
    {
      id: 1,
      name: { en: 'Brass Diya Set', hi: 'पीतल दीया सेट' },
      price: '₹299',
      image: '/products/diya-1.png'
    },
    {
      id: 2,
      name: { en: 'Rudraksha Mala', hi: 'रुद्राक्ष माला' },
      price: '₹499',
      image: '/products/rudrakash.png',
    },
    {
      id: 3,
      name: { en: 'Puja Thali', hi: 'पूजा थाली' },
      price: '₹699',
      image: '/products/pooja-thali-1.png',
    },
    {
      id: 4,
      name: { en: 'Gomati Chakra Set', hi: 'गोमती चक्र सेट' },
      price: '₹199',
      image: '/products/gomati-2.png',
    },
  ];

  return (
    <section className="bg-heritage-cream cursor-default select-none min-h-screen"> 
      <MyNav/>

      {/* Header Section - Heritage Design */}
      <section className="relative py-20 px-4 bg-ivory border-b border-sandalwood/10">
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

        <motion.div 
          initial={{opacity:0, y:50}}
          whileInView={{opacity:1, y:0}}
          transition={{duration:0.8, ease: 'easeInOut'}}
          viewport={{once:true}}
          className='relative flex flex-col items-center justify-center space-y-4'
        >
          <h1 className="text-5xl md:text-6xl font-light text-deep-brown tracking-wide text-center" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'हमारा ई-स्टोर' : 'Our Sacred Store'}
          </h1>
          <h3 className='text-sandalwood text-center font-light text-xl' style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi' ? 'भक्ति से भरा, सेवा के लिए समर्पित' : 'Filled with Devotion, Dedicated to Service'}
          </h3>
          <Image src="/products/products.png" className='opacity-80' width={150} height={150} alt="Store"/>
        </motion.div>
      </section>

      {/* Products Grid - Heritage Design */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                initial={{opacity:0, y:50}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.8, ease:"easeInOut"}}
                viewport={{once:true}}
                key={product.id}
                className="bg-ivory border border-sandalwood/15 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 bg-heritage-bg/30 flex items-center justify-center p-4">
                  <Image
                    src={product.image}
                    alt={product.name[language]}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                    {product.name[language]}
                  </h2>
                  <p className="text-lg font-light text-sandalwood" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {product.price}
                  </p>
                  <button className="w-full px-4 py-3 bg-sandalwood text-ivory rounded-sm font-light border border-sandalwood hover:bg-deep-brown transition-all duration-300" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
                    {language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-sandalwood/5 border-t border-sandalwood/10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-light text-deep-brown" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'Cormorant Garamond, serif' }}>
            {language === 'hi' ? 'पवित्र वस्तुएं' : 'Sacred Items'}
          </h2>
          <p className="text-incense font-light" style={{ fontFamily: language === 'hi' ? 'Noto Serif Devanagari, serif' : 'inherit' }}>
            {language === 'hi'
              ? 'अपनी आध्यात्मिक यात्रा के लिए प्रामाणिक पूजा सामग्री खरीदें।'
              : 'Purchase authentic puja items for your spiritual journey.'}
          </p>
        </div>
      </section>

      <Footer/>
    </section>
  );
}
