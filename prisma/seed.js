// Database Seed Script
// Run with: bunx prisma db seed

import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/password.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Admin User
  console.log('📝 Creating admin user...');
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kuberjitemple.org' },
    update: {},
    create: {
      name: 'Temple Admin',
      email: 'admin@kuberjitemple.org',
      password: adminPassword,
      phone: '+919876543210',
      role: 'ADMIN',
      language: 'en',
      emailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Demo User
  console.log('📝 Creating demo user...');
  const userPassword = await hashPassword('demo123');
  const user = await prisma.user.upsert({
    where: { email: 'user@temple.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'user@temple.com',
      password: userPassword,
      phone: '+919876543211',
      role: 'USER',
      language: 'en',
      emailVerified: true,
    },
  });
  console.log('✅ Demo user created:', user.email);

  // Create Services
  console.log('📝 Creating services...');
  
  const services = [
    {
      nameEn: 'Morning Aarti',
      nameHi: 'प्रातः आरती',
      descriptionEn: 'Begin your day with divine blessings. Traditional morning prayers and rituals performed at sunrise.',
      descriptionHi: 'दिव्य आशीर्वाद के साथ अपने दिन की शुरुआत करें। सूर्योदय पर की जाने वाली पारंपरिक सुबह की प्रार्थना और अनुष्ठान।',
      price: 501,
      duration: 30,
      category: 'DAILY_AARTI',
      benefitsEn: [
        'Positive start to the day',
        'Mental peace and clarity',
        'Spiritual awakening',
        'Divine blessings for family'
      ],
      benefitsHi: [
        'दिन की सकारात्मक शुरुआत',
        'मानसिक शांति और स्पष्टता',
        'आध्यात्मिक जागृति',
        'परिवार के लिए दिव्य आशीर्वाद'
      ],
      availableSlots: ['06:00', '07:00', '08:00'],
      imageUrl: '/images/morning-aarti.jpg',
    },
    {
      nameEn: 'Evening Aarti',
      nameHi: 'संध्या आरती',
      descriptionEn: 'Experience the divine atmosphere of evening prayers with sacred chants and lamp offerings.',
      descriptionHi: 'पवित्र मंत्रों और दीप अर्पण के साथ शाम की प्रार्थना के दिव्य वातावरण का अनुभव करें।',
      price: 501,
      duration: 30,
      category: 'DAILY_AARTI',
      benefitsEn: [
        'Peace of mind after day',
        'Removal of obstacles',
        'Family harmony',
        'Prosperity blessings'
      ],
      benefitsHi: [
        'दिन के बाद मन की शांति',
        'बाधाओं का निवारण',
        'पारिवारिक सौहार्द',
        'समृद्धि का आशीर्वाद'
      ],
      availableSlots: ['17:00', '18:00', '19:00'],
      imageUrl: '/images/evening-aarti.jpg',
    },
    {
      nameEn: 'Abhishekam Pooja',
      nameHi: 'अभिषेकम पूजा',
      descriptionEn: 'Sacred ritual bath of the deity with milk, honey, and holy water for spiritual purification.',
      descriptionHi: 'आध्यात्मिक शुद्धि के लिए दूध, शहद और पवित्र जल से देवता का पवित्र स्नान अनुष्ठान।',
      price: 1100,
      duration: 45,
      category: 'SPECIAL_POOJA',
      benefitsEn: [
        'Spiritual cleansing',
        'Removal of sins',
        'Health and wellness',
        'Divine grace'
      ],
      benefitsHi: [
        'आध्यात्मिक शुद्धि',
        'पापों का निवारण',
        'स्वास्थ्य और कल्याण',
        'दिव्य कृपा'
      ],
      availableSlots: ['09:00', '10:00', '11:00'],
      imageUrl: '/images/abhishekam.jpg',
    },
    {
      nameEn: 'Kuber Yantra Pooja',
      nameHi: 'कुबेर यंत्र पूजा',
      descriptionEn: 'Special worship of Lord Kuber with yantra installation for wealth and prosperity.',
      descriptionHi: 'धन और समृद्धि के लिए यंत्र स्थापना के साथ भगवान कुबेर की विशेष पूजा।',
      price: 2100,
      duration: 60,
      category: 'SPECIAL_POOJA',
      benefitsEn: [
        'Financial abundance',
        'Business success',
        'Debt removal',
        'Wealth multiplication'
      ],
      benefitsHi: [
        'वित्तीय प्रचुरता',
        'व्यवसाय में सफलता',
        'ऋण मुक्ति',
        'धन वृद्धि'
      ],
      availableSlots: ['09:00', '14:00'],
      imageUrl: '/images/kuber-yantra.jpg',
    },
    {
      nameEn: 'Rudrabhishek',
      nameHi: 'रुद्राभिषेक',
      descriptionEn: 'Powerful vedic ritual dedicated to Lord Shiva for spiritual growth and obstacle removal.',
      descriptionHi: 'आध्यात्मिक विकास और बाधा निवारण के लिए भगवान शिव को समर्पित शक्तिशाली वैदिक अनुष्ठान।',
      price: 2500,
      duration: 90,
      category: 'SPECIAL_POOJA',
      benefitsEn: [
        'Obstacle removal',
        'Inner strength',
        'Spiritual elevation',
        'Protection from negativity'
      ],
      benefitsHi: [
        'बाधा निवारण',
        'आंतरिक शक्ति',
        'आध्यात्मिक उन्नति',
        'नकारात्मकता से सुरक्षा'
      ],
      availableSlots: ['05:00', '06:00'],
      imageUrl: '/images/rudrabhishek.jpg',
    },
    {
      nameEn: 'Maha Aarti',
      nameHi: 'महा आरती',
      descriptionEn: 'Grand ceremonial aarti with full temple rituals, chanting, and offerings on special occasions.',
      descriptionHi: 'विशेष अवसरों पर पूर्ण मंदिर अनुष्ठान, मंत्रोच्चार और अर्पण के साथ भव्य औपचारिक आरती।',
      price: 5100,
      duration: 120,
      category: 'GRAND_CEREMONY',
      benefitsEn: [
        'Supreme blessings',
        'Fulfillment of wishes',
        'Complete spiritual experience',
        'Divine intervention'
      ],
      benefitsHi: [
        'सर्वोच्च आशीर्वाद',
        'मनोकामनाओं की पूर्ति',
        'संपूर्ण आध्यात्मिक अनुभव',
        'दिव्य हस्तक्षेप'
      ],
      availableSlots: ['07:00', '19:00'],
      imageUrl: '/images/maha-aarti.jpg',
    },
    {
      nameEn: 'Lakshmi-Kuber Pooja',
      nameHi: 'लक्ष्मी-कुबेर पूजा',
      descriptionEn: 'Combined worship of Goddess Lakshmi and Lord Kuber for wealth, prosperity, and abundance.',
      descriptionHi: 'धन, समृद्धि और प्रचुरता के लिए देवी लक्ष्मी और भगवान कुबेर की संयुक्त पूजा।',
      price: 3100,
      duration: 90,
      category: 'SPECIAL_POOJA',
      benefitsEn: [
        'Double blessings',
        'Complete prosperity',
        'Financial stability',
        'Long-term wealth'
      ],
      benefitsHi: [
        'दोहरा आशीर्वाद',
        'संपूर्ण समृद्धि',
        'वित्तीय स्थिरता',
        'दीर्घकालिक धन'
      ],
      availableSlots: ['10:00', '15:00'],
      imageUrl: '/images/lakshmi-kuber.jpg',
    },
    {
      nameEn: 'Special Prasad Seva',
      nameHi: 'विशेष प्रसाद सेवा',
      descriptionEn: 'Offering of special prasad to the deity and distribution to devotees for divine blessings.',
      descriptionHi: 'दिव्य आशीर्वाद के लिए देवता को विशेष प्रसाद अर्पित करना और भक्तों में वितरण।',
      price: 751,
      duration: 20,
      category: 'SEVA',
      benefitsEn: [
        'Divine blessings',
        'Health and happiness',
        'Purity of mind',
        'Spiritual nourishment'
      ],
      benefitsHi: [
        'दिव्य आशीर्वाद',
        'स्वास्थ्य और खुशी',
        'मन की शुद्धता',
        'आध्यात्मिक पोषण'
      ],
      availableSlots: ['08:00', '12:00', '18:00'],
      imageUrl: '/images/prasad-seva.jpg',
    },
  ];

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { 
        nameEn_nameHi: {
          nameEn: service.nameEn,
          nameHi: service.nameHi
        }
      },
      update: {},
      create: service,
    });
    console.log(`✅ Service created: ${created.nameEn}`);
  }

  // Create Sample Livestreams
  console.log('📝 Creating sample livestreams...');
  
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const livestreams = [
    {
      titleEn: 'Daily Morning Aarti - Live',
      titleHi: 'दैनिक प्रातः आरती - लाइव',
      descriptionEn: 'Join us for the sacred morning prayers and rituals',
      descriptionHi: 'पवित्र सुबह की प्रार्थना और अनुष्ठानों में हमसे जुड़ें',
      streamUrl: 'https://youtube.com/live/example',
      scheduledTime: new Date(tomorrow.setHours(6, 0, 0, 0)),
      status: 'SCHEDULED',
      thumbnailUrl: '/images/morning-aarti-thumb.jpg',
    },
    {
      titleEn: 'Evening Aarti - Live Stream',
      titleHi: 'संध्या आरती - लाइव स्ट्रीम',
      descriptionEn: 'Experience the divine evening prayers from anywhere',
      descriptionHi: 'कहीं से भी दिव्य संध्या प्रार्थना का अनुभव करें',
      streamUrl: 'https://youtube.com/live/example2',
      scheduledTime: new Date(tomorrow.setHours(19, 0, 0, 0)),
      status: 'SCHEDULED',
      thumbnailUrl: '/images/evening-aarti-thumb.jpg',
    },
  ];

  for (const livestream of livestreams) {
    const created = await prisma.livestream.create({
      data: livestream,
    });
    console.log(`✅ Livestream created: ${created.titleEn}`);
  }

  // Create Settings
  console.log('📝 Creating settings...');
  await prisma.setting.upsert({
    where: { key: 'temple_open_time' },
    update: {},
    create: {
      key: 'temple_open_time',
      value: '06:00',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'temple_close_time' },
    update: {},
    create: {
      key: 'temple_close_time',
      value: '21:00',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'enable_bookings' },
    update: {},
    create: {
      key: 'enable_bookings',
      value: 'true',
    },
  });

  console.log('✅ Settings created');

  console.log('\n✨ Database seed completed successfully!');
  console.log('\n📋 Summary:');
  console.log('   - Admin user: admin@kuberjitemple.org (password: admin123)');
  console.log('   - Demo user: user@temple.com (password: demo123)');
  console.log(`   - ${services.length} services created`);
  console.log(`   - ${livestreams.length} livestreams scheduled`);
  console.log('   - Temple settings configured');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
