// PDF Receipt Generator
import { jsPDF } from 'jspdf';

/**
 * Generate Payment Receipt PDF
 * @param {object} data - Receipt data
 * @returns {Buffer} - PDF buffer
 */
export function generateReceiptPDF(data) {
  const {
    receiptNumber,
    bookingId,
    userName,
    userEmail,
    userPhone,
    serviceName,
    serviceNameHi,
    amount,
    paymentMethod,
    paymentId,
    bookingDate,
    bookingTime,
    createdAt,
  } = data;

  // Create new PDF document
  const doc = new jsPDF();
  
  // Set colors
  const primaryColor = [139, 69, 19]; // Brown
  const accentColor = [255, 215, 0]; // Gold
  const textColor = [51, 51, 51]; // Dark gray

  // Header with logo area
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Temple name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('🕉️ KuberJi Mandir', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Pandukeshwar, Badrinath', 105, 28, { align: 'center' });
  doc.text('Payment Receipt', 105, 35, { align: 'center' });

  // Reset text color
  doc.setTextColor(...textColor);
  
  // Receipt details section
  let yPos = 55;
  
  // Receipt Number and Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt No: ${receiptNumber}`, 20, yPos);
  doc.text(`Date: ${new Date(createdAt).toLocaleDateString('en-IN')}`, 150, yPos);
  
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;

  // Customer Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details:', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${userName}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Email: ${userEmail}`, 20, yPos);
  
  if (userPhone) {
    yPos += 6;
    doc.text(`Phone: ${userPhone}`, 20, yPos);
  }
  
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;

  // Service Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Service Details:', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Service: ${serviceName}`, 20, yPos);
  
  yPos += 6;
  doc.text(`सेवा: ${serviceNameHi}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Booking Date: ${new Date(bookingDate).toLocaleDateString('en-IN')}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Time: ${bookingTime}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Booking ID: ${bookingId}`, 20, yPos);
  
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;

  // Payment Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Details:', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Method: ${paymentMethod}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Transaction ID: ${paymentId}`, 20, yPos);
  
  yPos += 6;
  doc.text(`Status: SUCCESS`, 20, yPos);
  
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 10;

  // Amount section with background
  doc.setFillColor(245, 245, 245);
  doc.rect(20, yPos - 5, 170, 15, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 20, yPos + 5);
  
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
  doc.text(formattedAmount, 190, yPos + 5, { align: 'right' });
  
  doc.setTextColor(...textColor);
  yPos += 20;

  // Footer
  yPos = 260;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(128, 128, 128);
  doc.text('This is a computer-generated receipt and does not require a signature.', 105, yPos, { align: 'center' });
  
  yPos += 5;
  doc.text('For any queries, please contact: contact@kuberjitemple.org', 105, yPos, { align: 'center' });
  
  yPos += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('🙏 Thank you for your donation! May Lord Kuber bless you! 🙏', 105, yPos, { align: 'center' });

  // Border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);

  // Return PDF as buffer
  return Buffer.from(doc.output('arraybuffer'));
}

/**
 * Generate Booking Confirmation PDF
 * @param {object} data - Booking data
 * @returns {Buffer} - PDF buffer
 */
export function generateBookingConfirmationPDF(data) {
  const {
    bookingId,
    userName,
    serviceName,
    serviceNameHi,
    bookingDate,
    bookingTime,
    amount,
    status,
  } = data;

  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('🕉️ Booking Confirmation', 105, 25, { align: 'center' });
  
  // Content
  let yPos = 60;
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(12);
  
  doc.text(`Dear ${userName},`, 20, yPos);
  yPos += 10;
  
  doc.setFont('helvetica', 'normal');
  doc.text('Your booking has been confirmed. Details below:', 20, yPos);
  yPos += 15;
  
  // Booking details
  doc.setFont('helvetica', 'bold');
  doc.text(`Booking ID: ${bookingId}`, 20, yPos);
  yPos += 10;
  
  doc.text(`Service: ${serviceName} (${serviceNameHi})`, 20, yPos);
  yPos += 10;
  
  doc.text(`Date: ${new Date(bookingDate).toLocaleDateString('en-IN')}`, 20, yPos);
  yPos += 10;
  
  doc.text(`Time: ${bookingTime}`, 20, yPos);
  yPos += 10;
  
  doc.text(`Amount: ₹${amount}`, 20, yPos);
  yPos += 10;
  
  doc.text(`Status: ${status}`, 20, yPos);
  
  return Buffer.from(doc.output('arraybuffer'));
}
