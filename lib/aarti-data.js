// Aarti & Pooja Services Data

export const AARTI_SERVICES = [
  {
    id: 1,
    titleKey: 'services.morningAarti.title',
    descriptionKey: 'services.morningAarti.description',
    benefitsKey: 'services.morningAarti.benefits',
    price: 501,
    duration: '30 minutes',
    timing: '6:00 AM - 6:30 AM',
    category: 'Daily Aarti',
    categoryKey: 'aarti.dailyAarti',
    image: '/images/temple/temple.jpg',
    videoUrl: '/pandukeshwar.mp4'
  },
  {
    id: 2,
    title: 'Evening Aarti',
    description: 'Experience the divine atmosphere of evening prayers with sacred chants and lamp offerings.',
    price: 501,
    duration: '30 minutes',
    timing: '7:00 PM - 7:30 PM',
    category: 'Daily Aarti',
    image: '/images/temple/temple-night.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Peace of mind after day',
      'Removal of obstacles',
      'Family harmony',
      'Prosperity blessings'
    ]
  },
  {
    id: 3,
    title: 'Abhishekam Pooja',
    description: 'Sacred ritual bath of the deity with milk, honey, and holy water for spiritual purification.',
    price: 1100,
    duration: '1 hour',
    timing: 'Morning or Evening',
    category: 'Special Pooja',
    image: '/images/milkbath.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Spiritual cleansing',
      'Removal of sins',
      'Health and wellness',
      'Divine grace'
    ]
  },
  {
    id: 4,
    title: 'Kuber Yantra Pooja',
    description: 'Special worship of Lord Kuber with yantra installation for wealth and prosperity.',
    price: 2100,
    duration: '1.5 hours',
    timing: 'Auspicious Muhurat',
    category: 'Special Pooja',
    image: '/images/kuberji/kuber-chowk-31.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Financial abundance',
      'Business success',
      'Debt removal',
      'Wealth multiplication'
    ]
  },
  {
    id: 5,
    title: 'Rudrabhishek',
    description: 'Powerful vedic ritual dedicated to Lord Shiva for spiritual growth and obstacle removal.',
    price: 1551,
    duration: '1.5 hours',
    timing: 'Morning',
    category: 'Grand Ceremony',
    image: '/images/milkbath2.jpeg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Obstacle removal',
      'Inner strength',
      'Spiritual elevation',
      'Protection from negativity'
    ]
  },
  {
    id: 6,
    title: 'Maha Aarti',
    description: 'Grand ceremonial aarti with full temple rituals, chanting, and offerings on special occasions.',
    price: 3100,
    duration: '2 hours',
    timing: 'Special Occasions',
    category: 'Grand Ceremony',
    image: '/images/temple/front-temple.jpg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Supreme blessings',
      'Fulfillment of wishes',
      'Complete spiritual experience',
      'Divine intervention'
    ]
  },
  {
    id: 7,
    title: 'Lakshmi-Kuber Pooja',
    description: 'Combined worship of Goddess Lakshmi and Lord Kuber for wealth, prosperity, and abundance.',
    price: 2551,
    duration: '2 hours',
    timing: 'Friday Evening',
    category: 'Special Pooja',
    image: '/images/kalas.jpg',
    videoUrl: '/pandukeshwar.mp4',
    benefits: [
      'Double blessings',
      'Complete prosperity',
      'Financial stability',
      'Long-term wealth'
    ]
  },
  {
    id: 8,
    title: 'Special Prasad Seva',
    description: 'Offering of special prasad to the deity and distribution to devotees for divine blessings.',
    price: 551,
    duration: '45 minutes',
    timing: 'Any time',
    category: 'Seva',
    image: '/images/carrying.jpeg',
    videoUrl: '/about-video.mp4',
    benefits: [
      'Divine blessings',
      'Health and happiness',
      'Purity of mind',
      'Spiritual nourishment'
    ]
  }
];

export const CATEGORIES = [
  'All Services',
  'Daily Aarti',
  'Special Pooja',
  'Grand Ceremony',
  'Seva'
];

// Purchase management
export function savePurchase(userId, service) {
  if (typeof window !== 'undefined') {
    const purchases = localStorage.getItem('kuberji_purchases') || '[]';
    const purchaseList = JSON.parse(purchases);
    
    purchaseList.push({
      id: Date.now(),
      userId,
      serviceId: service.id,
      service,
      purchaseDate: new Date().toISOString()
    });
    
    localStorage.setItem('kuberji_purchases', JSON.stringify(purchaseList));
  }
}

export function getUserPurchases(userId) {
  if (typeof window !== 'undefined') {
    const purchases = localStorage.getItem('kuberji_purchases') || '[]';
    const purchaseList = JSON.parse(purchases);
    return purchaseList.filter(p => p.userId === userId);
  }
  return [];
}
