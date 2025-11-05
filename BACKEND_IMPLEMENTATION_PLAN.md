# Backend Implementation Plan - KuberJi Mandir

## Phase 1: Database & Authentication Setup ✅ (Current)

### 1.1 Database Schema (PostgreSQL/MongoDB)
```javascript
// Users Collection/Table
{
  id: UUID/ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  phone: String,
  role: Enum['user', 'admin', 'priest'],
  createdAt: Timestamp,
  updatedAt: Timestamp,
  preferences: {
    language: String,
    notifications: Boolean
  }
}

// Bookings Collection/Table
{
  id: UUID/ObjectId,
  userId: Reference to Users,
  serviceId: Reference to Services,
  bookingDate: Date,
  bookingTime: String,
  status: Enum['pending', 'confirmed', 'completed', 'cancelled'],
  amount: Number,
  paymentStatus: Enum['pending', 'paid', 'refunded'],
  paymentId: String (from Razorpay/Stripe),
  videoUrl: String (livestream/recording),
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// Services Collection/Table
{
  id: UUID/ObjectId,
  name: { en: String, hi: String },
  description: { en: String, hi: String },
  price: Number,
  duration: Number (minutes),
  category: Enum['daily_aarti', 'special_pooja', 'grand_ceremony', 'seva'],
  benefits: [{ en: String, hi: String }],
  availableSlots: [String],
  imageUrl: String,
  isActive: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// Payments Collection/Table
{
  id: UUID/ObjectId,
  bookingId: Reference to Bookings,
  userId: Reference to Users,
  amount: Number,
  currency: String,
  paymentMethod: String,
  paymentGateway: Enum['razorpay', 'stripe'],
  gatewayPaymentId: String,
  gatewayOrderId: String,
  status: Enum['initiated', 'success', 'failed', 'refunded'],
  receiptUrl: String (PDF),
  createdAt: Timestamp,
  updatedAt: Timestamp
}

// Livestreams Collection/Table
{
  id: UUID/ObjectId,
  title: { en: String, hi: String },
  description: { en: String, hi: String },
  streamUrl: String,
  scheduledTime: Timestamp,
  status: Enum['scheduled', 'live', 'completed'],
  viewCount: Number,
  recordingUrl: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 1.2 API Routes Structure
```
/api
  /auth
    /register      POST - User registration
    /login         POST - User login
    /logout        POST - User logout
    /refresh       POST - Refresh JWT token
    /verify        GET  - Verify email
    /forgot-password POST - Password reset request
    /reset-password  POST - Reset password
  
  /users
    /profile       GET, PUT - User profile
    /bookings      GET - User's bookings
    
  /services
    /              GET - List all services
    /:id           GET - Get service details
    /              POST - Create service (admin)
    /:id           PUT - Update service (admin)
    /:id           DELETE - Delete service (admin)
    
  /bookings
    /              POST - Create booking
    /:id           GET - Get booking details
    /              GET - List user bookings
    /:id           PUT - Update booking status
    /:id/cancel    POST - Cancel booking
    
  /payments
    /create-order  POST - Create payment order
    /verify        POST - Verify payment
    /receipt/:id   GET - Get payment receipt (PDF)
    /refund        POST - Process refund (admin)
    
  /livestreams
    /              GET - List livestreams
    /:id           GET - Get livestream details
    /current       GET - Get current live stream
    
  /admin
    /dashboard     GET - Dashboard analytics
    /bookings      GET - All bookings
    /users         GET - All users
    /services      GET, POST, PUT, DELETE - Manage services
    /analytics     GET - Analytics data
```

### 1.3 Environment Variables (.env.local)
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/kuberji_mandir
# or for MongoDB
MONGODB_URI=mongodb://localhost:27017/kuberji_mandir

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
# or
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email Service (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Livestream (if using custom service)
LIVESTREAM_API_KEY=your_livestream_api_key
LIVESTREAM_URL=https://stream.example.com

# AWS S3 (for video storage)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_BUCKET_NAME=kuberji-videos

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Phase 2: Payment Gateway Integration 🔄

### 2.1 Razorpay Integration
- Setup Razorpay account
- Create payment orders
- Handle webhooks
- Generate receipts

### 2.2 Features
- Real-time payment verification
- PDF receipt generation
- Order tracking
- Refund processing

## Phase 3: Advanced Features 🔄

### 3.1 Livestreaming
- Integration with streaming service (YouTube API, Custom RTMP)
- Daily Aarti scheduling
- Recording storage
- Playback for booked users

### 3.2 Calendar System
- Booking calendar
- Slot management
- Availability checking
- Date/time picker

### 3.3 Email Notifications
- Booking confirmation
- Payment receipts
- Reminder emails
- Cancellation notifications

### 3.4 PDF Generation
- Payment receipts
- Booking confirmations
- Tax invoices

### 3.5 User Profile
- Edit profile information
- View booking history
- Manage preferences
- Payment history

## Phase 4: Admin Panel 🔄

### 4.1 Dashboard
- Total bookings stats
- Revenue analytics
- User growth charts
- Service popularity

### 4.2 Booking Management
- View all bookings
- Update booking status
- Cancel/refund bookings
- Assign priests

### 4.3 Service Management
- Add/edit/delete services
- Manage pricing
- Update availability
- Upload images

### 4.4 User Management
- View all users
- User roles
- Ban/unban users
- User activity logs

### 4.5 Analytics
- Revenue trends
- Popular services
- Booking patterns
- User demographics

## Technology Stack

### Backend
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM (or MongoDB with Mongoose)
- **Authentication:** JWT with httpOnly cookies
- **Payment:** Razorpay SDK
- **Email:** Nodemailer
- **PDF:** jsPDF or PDFKit
- **Validation:** Zod
- **Security:** bcrypt, helmet, rate-limiting

### Frontend Integration
- **State Management:** React Context + SWR for data fetching
- **Forms:** React Hook Form
- **Date Picker:** react-datepicker
- **Charts:** recharts
- **PDF Viewer:** react-pdf

## Implementation Priority

1. **High Priority** (Phase 1)
   - Database setup
   - Authentication API
   - Session management
   - Basic booking API

2. **Medium Priority** (Phase 2)
   - Payment gateway integration
   - Receipt generation
   - Email notifications

3. **Lower Priority** (Phase 3-4)
   - Livestreaming
   - Advanced admin features
   - Analytics dashboard

## Security Considerations

1. **Authentication**
   - JWT tokens stored in httpOnly cookies
   - Refresh token rotation
   - Password hashing with bcrypt (10+ rounds)
   - Email verification

2. **API Security**
   - Rate limiting
   - CORS configuration
   - Input validation
   - SQL injection prevention
   - XSS protection

3. **Payment Security**
   - Webhook signature verification
   - Amount validation
   - Idempotency keys
   - PCI compliance

4. **Data Protection**
   - Encrypted database connections
   - Sensitive data encryption
   - Regular backups
   - GDPR compliance

## Testing Strategy

1. Unit tests for API routes
2. Integration tests for payment flow
3. End-to-end tests for booking process
4. Load testing for concurrent bookings
5. Security testing

## Deployment Considerations

1. **Database**
   - Managed PostgreSQL (Supabase, Railway, Neon)
   - or MongoDB Atlas

2. **Application**
   - Vercel (for Next.js)
   - Railway
   - AWS/GCP

3. **Storage**
   - AWS S3 for videos/PDFs
   - Cloudinary for images

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring

## Next Steps

1. ✅ Setup database schema
2. ✅ Create API route structure
3. 🔄 Implement authentication API
4. 🔄 Setup Prisma/Mongoose
5. 🔄 Create booking flow
6. 🔄 Integrate Razorpay
