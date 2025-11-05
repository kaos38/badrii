// Get All Services API
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('active');

    // Build where clause
    const where = {};
    
    if (category) {
      where.category = category;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    // Fetch services
    const services = await prisma.service.findMany({
      where,
      orderBy: {
        price: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      services: services.map((service) => ({
        id: service.id,
        nameEn: service.nameEn,
        nameHi: service.nameHi,
        descriptionEn: service.descriptionEn,
        descriptionHi: service.descriptionHi,
        price: service.price,
        duration: service.duration,
        category: service.category,
        benefitsEn: service.benefitsEn,
        benefitsHi: service.benefitsHi,
        availableSlots: service.availableSlots,
        imageUrl: service.imageUrl,
        isActive: service.isActive,
      })),
    });
  } catch (error) {
    console.error('Fetch services error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
