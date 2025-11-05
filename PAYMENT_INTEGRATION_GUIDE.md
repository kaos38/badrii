# 💳 Payment Integration Guide - Phase 2 Complete!

**Status:** ✅ Payment System Implemented  
**Gateway:** Razorpay  
**Date:** October 28, 2025

---

## 🎉 What's Been Implemented

### ✅ Backend APIs
1. **Create Order API** - `/api/payments/create-order`
2. **Verify Payment API** - `/api/payments/verify`
3. **Webhook Handler** - `/api/payments/webhook`
4. **Get Bookings API** - `/api/bookings/my-bookings`
5. **Get Services API** - `/api/services`

### ✅ Utility Libraries
1. **Razorpay Utils** - `lib/razorpay.js`
   - Order creation
   - Signature verification
   - Payment fetching
   - Refund handling
   - Receipt number generation

2. **PDF Generator** - `lib/pdf-generator.js`
   - Payment receipt generation
   - Booking confirmation PDF
   - Professional heritage-themed design

### ✅ Frontend Components
1. **RazorpayButton** - `components/payment/RazorpayButton.jsx`
   - Reusable payment button
   - Razorpay checkout integration
   - Error handling
   - Success callbacks

2. **Book Service Page** - `/book-service`
   - Service selection
   - Date/time picker
   - Bilingual interface
   - Payment integration

3. **Success Page** - `/booking-success`
   - Confirmation message
   - Receipt number display
   - Next steps guidance

---

## 🚀 Setup Instructions

### Step 1: Create Razorpay Account

1. **Go to Razorpay:**
   - Visit: https://razorpay.com
   - Click "Sign Up" (it's free for testing)

2. **Complete Registration:**
   - Provide business details
   - Verify email and phone
   - Complete KYC (for live mode later)

3. **Enable Test Mode:**
   - In dashboard, toggle to "Test Mode"
   - This gives you test API keys

### Step 2: Get API Credentials

1. **Go to Settings:**
   - Dashboard → Settings → API Keys
   - Click "Generate Test Key"

2. **Copy Credentials:**
   ```
   Key ID: rzp_test_xxxxxxxxxxxxx
   Key Secret: xxxxxxxxxxxxxxxxxxxxx
   ```

3. **Update `.env` file:**
   ```env
   RAZORPAY_KEY_ID="rzp_test_your_key_id_here"
   RAZORPAY_SECRET="your_secret_key_here"
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_your_key_id_here"
   ```

### Step 3: Configure Webhook (Optional but Recommended)

1. **Go to Webhooks:**
   - Dashboard → Settings → Webhooks
   - Click "Add New Webhook URL"

2. **Add Webhook URL:**
   ```
   URL: https://your-domain.com/api/payments/webhook
   (For local testing: Use ngrok or similar)
   ```

3. **Select Events:**
   - payment.authorized
   - payment.captured
   - payment.failed
   - order.paid
   - refund.created

4. **Generate Webhook Secret:**
   - Copy the secret
   - Add to `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET="your_webhook_secret_here"
   ```

---

## 🧪 Testing Payment Flow

### Test Cards (Use in Test Mode)

#### Successful Payment
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name
```

#### Failed Payment
```
Card Number: 4000 0000 0000 0002
CVV: Any 3 digits
Expiry: Any future date
```

#### Other Test Cards
- Mastercard: 5555 5555 5555 4444
- Amex: 3782 822463 10005
- Rupay: 6073 7494 0000 0006

### Testing Steps

1. **Start Development Server:**
   ```bash
   bun run dev
   ```

2. **Login:**
   - Go to: http://localhost:3000/auth/login
   - Email: user@temple.com
   - Password: demo123

3. **Book a Service:**
   - Go to: http://localhost:3000/book-service?serviceId=[SERVICE_ID]
   - Or create a services listing page first

4. **Complete Payment:**
   - Select date and time
   - Click "Proceed to Payment"
   - Use test card details
   - Complete payment

5. **Verify Success:**
   - You'll be redirected to success page
   - Check `/public/receipts/` for generated PDF
   - View in "My Bookings" section

---

## 📡 API Endpoints Documentation

### 1. Create Payment Order

**Endpoint:** `POST /api/payments/create-order`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "serviceId": "service-uuid",
  "bookingDate": "2025-11-01",
  "bookingTime": "10:00",
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxx",
    "amount": 50100,
    "currency": "INR"
  },
  "booking": {
    "id": "booking-uuid",
    "serviceName": "Morning Aarti",
    "serviceNameHi": "प्रातः आरती",
    "bookingDate": "2025-11-01T00:00:00.000Z",
    "bookingTime": "10:00",
    "amount": 501
  },
  "razorpayKeyId": "rzp_test_xxxxx"
}
```

### 2. Verify Payment

**Endpoint:** `POST /api/payments/verify`

**Authentication:** Required (JWT)

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx",
  "bookingId": "booking-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "payment": {
    "id": "payment-uuid",
    "receiptNumber": "RCP-1234567890-1234",
    "receiptUrl": "/receipts/receipt-RCP-1234567890-1234.pdf",
    "amount": 501,
    "status": "SUCCESS"
  },
  "booking": {
    "id": "booking-uuid",
    "status": "CONFIRMED",
    "serviceName": "Morning Aarti",
    "bookingDate": "2025-11-01T00:00:00.000Z",
    "bookingTime": "10:00"
  }
}
```

### 3. Get My Bookings

**Endpoint:** `GET /api/bookings/my-bookings`

**Authentication:** Required (JWT)

**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "id": "booking-uuid",
      "status": "CONFIRMED",
      "paymentStatus": "PAID",
      "bookingDate": "2025-11-01T00:00:00.000Z",
      "bookingTime": "10:00",
      "amount": 501,
      "notes": null,
      "createdAt": "2025-10-28T10:00:00.000Z",
      "service": {
        "nameEn": "Morning Aarti",
        "nameHi": "प्रातः आरती",
        "price": 501,
        "duration": 30,
        "category": "DAILY_AARTI",
        "imageUrl": "/images/morning-aarti.jpg"
      },
      "payment": {
        "receiptNumber": "RCP-1234567890-1234",
        "receiptUrl": "/receipts/receipt-RCP-1234567890-1234.pdf",
        "status": "SUCCESS",
        "createdAt": "2025-10-28T10:05:00.000Z"
      }
    }
  ]
}
```

### 4. Get All Services

**Endpoint:** `GET /api/services`

**Authentication:** Not required

**Query Parameters:**
- `category` (optional): Filter by category
- `active` (optional): Filter by active status

**Response:**
```json
{
  "success": true,
  "services": [
    {
      "id": "service-uuid",
      "nameEn": "Morning Aarti",
      "nameHi": "प्रातः आरती",
      "descriptionEn": "Begin your day with divine blessings...",
      "descriptionHi": "दिव्य आशीर्वाद के साथ...",
      "price": 501,
      "duration": 30,
      "category": "DAILY_AARTI",
      "benefitsEn": ["Positive start", "Mental peace"],
      "benefitsHi": ["सकारात्मक शुरुआत", "मानसिक शांति"],
      "availableSlots": ["06:00", "07:00", "08:00"],
      "imageUrl": "/images/morning-aarti.jpg",
      "isActive": true
    }
  ]
}
```

---

## 🎨 Frontend Integration

### Using the RazorpayButton Component

```jsx
import RazorpayButton from '@/components/payment/RazorpayButton';

// In your component
<RazorpayButton
  serviceId="service-uuid"
  serviceName="Morning Aarti"
  serviceNameHi="प्रातः आरती"
  amount={501}
  bookingDate="2025-11-01"
  bookingTime="10:00"
  notes="Optional notes"
  onSuccess={(data) => {
    console.log('Payment successful:', data);
    // Handle success
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
    // Handle error
  }}
  className="custom-class"
>
  Pay Now ₹501
</RazorpayButton>
```

### Custom Payment Flow

```javascript
// Create order
const response = await fetch('/api/payments/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serviceId: 'service-uuid',
    bookingDate: '2025-11-01',
    bookingTime: '10:00'
  })
});

const data = await response.json();

// Load Razorpay
const options = {
  key: data.razorpayKeyId,
  amount: data.order.amount,
  currency: data.order.currency,
  order_id: data.order.id,
  name: 'KuberJi Mandir',
  description: data.booking.serviceName,
  handler: async function(response) {
    // Verify payment
    const verifyResponse = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        bookingId: data.booking.id
      })
    });
    
    const verifyData = await verifyResponse.json();
    // Handle success
  }
};

const razorpay = new window.Razorpay(options);
razorpay.open();
```

---

## 📄 PDF Receipt Features

Generated receipts include:
- ✅ Temple branding and logo area
- ✅ Receipt number and date
- ✅ Customer details
- ✅ Service details (bilingual)
- ✅ Booking date and time
- ✅ Payment method and transaction ID
- ✅ Total amount with formatting
- ✅ Professional layout with borders
- ✅ "May Lord Kuber bless you" message

Receipts are saved to: `/public/receipts/receipt-[RECEIPT_NUMBER].pdf`

---

## 🔐 Security Features

### Implemented
- ✅ Signature verification for payments
- ✅ Webhook signature verification
- ✅ Authentication required for payment APIs
- ✅ User ownership verification for bookings
- ✅ HTTPS recommended for production
- ✅ Secure environment variable storage

### Best Practices
- Never expose Razorpay secret key in frontend
- Always verify payment signatures on backend
- Use webhook secret for webhook verification
- Enable 2FA on Razorpay dashboard
- Monitor payment logs regularly

---

## 🚨 Error Handling

### Common Errors

#### 1. Invalid Signature
```json
{
  "success": false,
  "error": "Invalid payment signature"
}
```
**Solution:** Check Razorpay secret key, ensure no modification of payment data

#### 2. Slot Already Booked
```json
{
  "success": false,
  "error": "This time slot is already booked"
}
```
**Solution:** User should select different time slot

#### 3. Service Not Found
```json
{
  "success": false,
  "error": "Service not found"
}
```
**Solution:** Ensure valid service ID is provided

#### 4. Payment Failed
```json
{
  "success": false,
  "error": "Payment failed"
}
```
**Solution:** User should retry with different card or payment method

---

## 📊 Database Schema Updates

All required tables already exist from Phase 1:
- ✅ `bookings` - Stores booking records
- ✅ `payments` - Stores payment transactions
- ✅ `users` - User information
- ✅ `services` - Available services

No schema changes required! 🎉

---

## 🎯 What's Next?

### Phase 3: Booking System Enhancement
- [ ] Create services listing page
- [ ] Add calendar view for bookings
- [ ] Implement booking cancellation
- [ ] Add refund processing
- [ ] Email notifications

### Phase 4: Admin Features
- [ ] Admin dashboard
- [ ] View all bookings
- [ ] Manage services
- [ ] Revenue reports
- [ ] Analytics

---

## 🧪 Testing Checklist

- [ ] Create Razorpay test account
- [ ] Add test API keys to `.env`
- [ ] Test successful payment flow
- [ ] Test failed payment scenario
- [ ] Verify PDF receipt generation
- [ ] Check webhook handling (optional)
- [ ] Test slot availability check
- [ ] Verify booking appears in database
- [ ] Test "My Bookings" page
- [ ] Download and verify PDF receipt

---

## 📞 Support

### Razorpay Resources
- Dashboard: https://dashboard.razorpay.com
- Documentation: https://razorpay.com/docs
- API Reference: https://razorpay.com/docs/api
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details
- Support: support@razorpay.com

### Integration Help
- Check browser console for errors
- Verify API keys are correct
- Ensure test mode is enabled
- Check webhook logs in Razorpay dashboard
- Review server logs for backend errors

---

**Status:** Phase 2 Ready for Testing! 🎉  
**Next:** Add Razorpay credentials and test the payment flow!

🕉️ **May your payments be smooth and your bookings plentiful!** 🕉️
