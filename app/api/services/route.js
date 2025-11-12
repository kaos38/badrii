// Get All Services API
import { NextResponse } from 'next/server';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';

// Cache configuration
const CACHE_DURATION = 300; // 5 minutes in seconds

export async function GET(request) {
  try {
    // Check if database is configured
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { 
          success: true, 
          services: [],
          message: 'Database not configured. Please contact administrator.' 
        },
        { status: 200 }
      );
    }

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

    // Fetch services with optimized query (only select needed fields)
    const services = await prisma.service.findMany({
      where,
      select: {
        id: true,
        nameEn: true,
        nameHi: true,
        descriptionEn: true,
        descriptionHi: true,
        price: true,
        duration: true,
        category: true,
        benefitsEn: true,
        benefitsHi: true,
        availableSlots: true,
        imageUrl: true,
        isActive: true,
      },
      orderBy: {
        price: 'asc',
      },
    });

    const response = NextResponse.json({
      success: true,
      services,
    });

    // Add cache headers for better performance
    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`
    );

    return response;
  } catch (error) {
    console.error('Fetch services error:', error);
    
    // Return proper JSON error instead of letting Next.js render HTML error page
    return NextResponse.json(
      { 
        success: false, 
        services: [],
        error: error.message || 'Internal server error' 
      },
      { status: 200 } // Return 200 to avoid triggering error page
    );
  }
}
