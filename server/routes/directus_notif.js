const router = require("express").Router();
const axiosInstance = require("../utils/axiosInstance");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// Function to upload PDF file to Directus
const uploadPDFToDirectus = async (pdfPath, filename) => {
  try {
    const formData = new FormData();

    formData.append("file", fs.createReadStream(pdfPath), {
      filename: filename,
      contentType: "application/pdf",
    });

    const uploadResponse = await axiosInstance.post("/files", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log("✅ PDF uploaded to Directus:", uploadResponse.data.data.id);
    return uploadResponse.data.data.id;
  } catch (error) {
    console.error(
      "❌ PDF upload error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to save notification to user_notification table
const saveNotificationToDatabase = async (
  title,
  message,
  userId,
  bookingId
) => {
  try {
    const notificationData = {
      title: title,
      message: message,
      user: userId,
      booking: bookingId,
      created_at: new Date().toISOString(),
    };

    const response = await axiosInstance.post(
      "/items/user_notification",
      notificationData
    );
    console.log("✅ Notification saved to database:", response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.error(
      "❌ Database notification save error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to send push notification
const sendPushNotification = async (notificationToken, title, body) => {
  if (!notificationToken) {
    console.log("⚠️ No notification token provided");
    return false;
  }

  const payload = {
    to: notificationToken,
    title: title,
    body: body,
    sound: "default",
  };

  try {
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      payload,
      {
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Push notification sent:", response.data);
    return true;
  } catch (error) {
    console.error(
      "❌ Push notification error:",
      error.response?.data || error.message
    );
    return false;
  }
};

// Generate HTML content for PDF
const generateBookingHTML = (bookingData) => {
  const { ticket, passengers } = bookingData;

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Flight Booking Details</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #fff;
          padding: 40px;
          font-size: 14px;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 300;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        
        .header .subtitle {
          font-size: 16px;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        
        .content {
          padding: 40px;
        }
        
        .section {
          margin-bottom: 35px;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          border-left: 4px solid #667eea;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }
        
        .section-title::before {
          content: '';
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border-radius: 50%;
          background: #667eea;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .info-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }
        
        .info-label {
          font-weight: 600;
          color: #6c757d;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-size: 16px;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .price-highlight {
          color: #27ae60;
          font-size: 20px;
          font-weight: 700;
        }
        
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          background: #27ae60;
          color: white;
        }
        
        .flight-route {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border: 2px solid #e9ecef;
        }
        
        .location {
          text-align: center;
          flex: 1;
        }
        
        .location-code {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .location-name {
          font-size: 14px;
          color: #6c757d;
        }
        
        .flight-arrow {
          flex: 0 0 80px;
          text-align: center;
          position: relative;
        }
        
        .flight-arrow::before {
          content: '✈';
          font-size: 24px;
          color: #667eea;
        }
        
        .flight-arrow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 20%;
          right: 20%;
          height: 2px;
          background: #667eea;
          transform: translateY(-50%);
          z-index: -1;
        }
        
        .passengers-list {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e9ecef;
        }
        
        .passenger-item {
          padding: 20px;
          border-bottom: 1px solid #f1f3f4;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .passenger-item:last-child {
          border-bottom: none;
        }
        
        .passenger-name {
          font-weight: 600;
          color: #2c3e50;
          font-size: 16px;
        }
        
        .passenger-details {
          display: flex;
          gap: 20px;
          font-size: 14px;
          color: #6c757d;
        }
        
        .passenger-detail {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .passenger-detail-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }
        
        .passenger-detail-value {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .footer {
          background: #2c3e50;
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .footer-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .footer-text {
          font-size: 14px;
          opacity: 0.8;
          line-height: 1.5;
          margin-bottom: 8px;
        }
        
        .contact-info {
          font-size: 14px;
          color: #67b7dc;
          margin-top: 15px;
        }
        
        @media print {
          body { padding: 20px; }
          .container { box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Flight Booking Confirmation</h1>
          <div class="subtitle">Lingua Travel Services</div>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Booking Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Booking ID</div>
                <div class="info-value">${bookingData.id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge">${bookingData.status}</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Payment Method</div>
                <div class="info-value">${bookingData.payment_method}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Total Price</div>
                <div class="info-value price-highlight">₱${
                  bookingData.total_price
                }</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Flight Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Ticket ID</div>
                <div class="info-value">${ticket.id}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Flight Type</div>
                <div class="info-value">${ticket.type}</div>
              </div>
            </div>
            
            <div class="flight-route">
              <div class="location">
                <div class="location-code">${ticket.departure_location}</div>
                <div class="location-name">Departure</div>
              </div>
              <div class="flight-arrow"></div>
              <div class="location">
                <div class="location-code">${ticket.arrival_location}</div>
                <div class="location-name">Arrival</div>
              </div>
            </div>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Departure Time</div>
                <div class="info-value">${formatDate(
                  ticket.departure_schedule
                )}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Arrival Time</div>
                <div class="info-value">${formatDate(
                  ticket.arrival_schedule
                )}</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Passengers (${passengers.length})</div>
            <div class="passengers-list">
              ${passengers
                .map(
                  (passenger, index) => `
                <div class="passenger-item">
                  <div>
                    <div class="passenger-name">Passenger ${index + 1}: ${
                    passenger.name
                  }</div>
                  </div>
                  <div class="passenger-details">
                    <div class="passenger-detail">
                      <div class="passenger-detail-label">Seat</div>
                      <div class="passenger-detail-value">${
                        passenger.seat || "Not assigned"
                      }</div>
                    </div>
                    <div class="passenger-detail">
                      <div class="passenger-detail-label">Ticket Number</div>
                      <div class="passenger-detail-value">${
                        passenger.ticket_number || "Pending"
                      }</div>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-title">Thank you for choosing Lingua Travel</div>
          <div class="footer-text">
            This is your official booking confirmation. Please keep this document for your records.
          </div>
          <div class="footer-text">
            Have a wonderful trip and enjoy your travel experience with us!
          </div>
          <div class="contact-info">
            For support and inquiries: support@lingua.com
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate PDF using Puppeteer with enhanced error handling
const generateBookingPDF = async (bookingData, outputPath) => {
  let browser;

  try {
    // Try launching browser with comprehensive server-compatible options
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      timeout: 60000,
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    });

    const htmlContent = generateBookingHTML(bookingData);

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Generate PDF with high-quality settings
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
      preferCSSPageSize: true,
    });

    console.log(`✅ PDF generated successfully: ${outputPath}`);
  } catch (error) {
    console.error("❌ Puppeteer PDF generation failed:", error.message);

    // Fallback: Create a simple text-based PDF notification
    await createFallbackPDF(bookingData, outputPath);
    console.log(`⚠️ Fallback PDF created: ${outputPath}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("❌ Error closing browser:", closeError.message);
      }
    }
  }
};

// Fallback PDF creation using simple HTML (no complex styling)
const createFallbackPDF = async (bookingData, outputPath) => {
  const { ticket, passengers } = bookingData;

  const simpleHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Flight Booking Details</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.4; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .label { font-weight: bold; display: inline-block; width: 150px; }
        .value { display: inline-block; }
        .passenger { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Flight Booking Confirmation</h1>
        <p>Lingua Travel Services</p>
      </div>
      
      <div class="section">
        <h2>Booking Information</h2>
        <div><span class="label">Booking ID:</span> <span class="value">${
          bookingData.id
        }</span></div>
        <div><span class="label">Status:</span> <span class="value">${
          bookingData.status
        }</span></div>
        <div><span class="label">Payment Method:</span> <span class="value">${
          bookingData.payment_method
        }</span></div>
        <div><span class="label">Total Price:</span> <span class="value">₱${
          bookingData.total_price
        }</span></div>
      </div>
      
      <div class="section">
        <h2>Flight Details</h2>
        <div><span class="label">Ticket ID:</span> <span class="value">${
          ticket.id
        }</span></div>
        <div><span class="label">Flight Type:</span> <span class="value">${
          ticket.type
        }</span></div>
        <div><span class="label">Departure:</span> <span class="value">${
          ticket.departure_location
        }</span></div>
        <div><span class="label">Arrival:</span> <span class="value">${
          ticket.arrival_location
        }</span></div>
        <div><span class="label">Departure Time:</span> <span class="value">${new Date(
          ticket.departure_schedule
        ).toLocaleString()}</span></div>
        <div><span class="label">Arrival Time:</span> <span class="value">${new Date(
          ticket.arrival_schedule
        ).toLocaleString()}</span></div>
      </div>
      
      <div class="section">
        <h2>Passengers (${passengers.length})</h2>
        ${passengers
          .map(
            (passenger, index) => `
          <div class="passenger">
            <div><strong>Passenger ${index + 1}:</strong> ${
              passenger.name
            }</div>
            <div>Seat: ${passenger.seat || "Not assigned"}</div>
            <div>Ticket Number: ${passenger.ticket_number || "Pending"}</div>
          </div>
        `
          )
          .join("")}
      </div>
      
      <div class="section">
        <p><em>Thank you for choosing Lingua Travel. For support, contact us at support@lingua.com</em></p>
        <p><em>This is your official booking confirmation. Please keep this document for your records.</em></p>
      </div>
    </body>
    </html>
  `;

  // Try to create simple PDF with minimal browser requirements
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(simpleHTML, { waitUntil: "domcontentloaded" });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: false,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });
  } finally {
    await browser.close();
  }
};

router.post("/booking", async (req, res) => {
  const bookingId = req.query.key;

  try {
    const { data: response } = await axiosInstance.get(
      `/items/booking/${bookingId}?fields=*,ticket.*,ticket.return_ticket.*,passengers.name,passengers.ticket_number,passengers.seat,passengers.return_seat,user_created.notification_id,user_created.id,ticket.travel_package.name,booking_details_pdf`
    );
    const bookingData = response.data;
    const status = bookingData.status;
    const notificationToken = bookingData.user_created?.notification_id;
    const userId = bookingData.user_created?.id;
    const travelPackageName =
      bookingData.ticket?.travel_package?.name || "Travel Package";
    console.log("server/routes/directus_notif.js: bookingData: ", bookingData);

    if (status === "Paid") {
      // Check if PDF has already been generated and uploaded
      if (bookingData.booking_details_pdf) {
        console.log(
          `⚠️ PDF already exists for booking ${bookingId}, skipping generation`
        );
        return res.status(200).json({
          success: true,
          message: "Booking already processed, PDF exists.",
        });
      }

      // Prepare PDF path
      const pdfDir = path.join(__dirname, "../pdfs");
      if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
      const pdfFilename = `booking_${bookingData.id}.pdf`;
      const pdfPath = path.join(pdfDir, pdfFilename);

      try {
        // Generate PDF using Puppeteer
        await generateBookingPDF(bookingData, pdfPath);
        console.log(`✅ PDF saved on server: ${pdfPath}`);

        // Upload PDF to Directus
        const uploadedPDFId = await uploadPDFToDirectus(pdfPath, pdfFilename);

        // Update booking record with PDF reference
        await axiosInstance.patch(`/items/booking/${bookingId}`, {
          booking_details_pdf: uploadedPDFId,
        });
        console.log("✅ Booking record updated with PDF reference");

        // Prepare notification content
        const notificationTitle = "Booking Confirmed";
        const notificationMessage = `Your booking for ${travelPackageName} has been confirmed! Check your app for details.`;

        // Send push notification
        const pushSent = await sendPushNotification(
          notificationToken,
          notificationTitle,
          notificationMessage
        );

        // Save notification to database
        if (userId) {
          await saveNotificationToDatabase(
            notificationTitle,
            notificationMessage,
            userId,
            bookingId
          );
        }

        if (pushSent) {
          res.status(200).json({
            success: true,
            message: "PDF generated, uploaded, and notification sent.",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "PDF generated and uploaded, but notification failed.",
          });
        }
      } catch (pdfError) {
        console.error("❌ Error generating PDF:", pdfError);
        res.status(500).json({
          error: "Failed to generate PDF",
        });
      }
    } else if (status === "Approved") {
      // Send push notification for approved status
      const notificationTitle = "Booking Approved";
      const notificationMessage = `Your booking for ${travelPackageName} has been approved! Please proceed to payment.`;

      const pushSent = await sendPushNotification(
        notificationToken,
        notificationTitle,
        notificationMessage
      );

      // Save notification to database
      if (userId) {
        try {
          await saveNotificationToDatabase(
            notificationTitle,
            notificationMessage,
            userId,
            bookingId
          );
        } catch (dbError) {
          console.error(
            "❌ Failed to save approved notification to database:",
            dbError
          );
        }
      }

      if (pushSent) {
        res
          .status(200)
          .json({ success: true, message: "Approved notification sent." });
      } else {
        res.status(200).json({
          success: true,
          message: "Approved but notification failed.",
        });
      }
    } else if (status === "Cancelled" || status === "Rejected") {
      // Send push notification for cancelled/rejected status
      const notificationTitle = `Booking ${status}`;
      const notificationMessage = `Your booking for ${travelPackageName} has been ${status.toLowerCase()}. Contact support if you have questions.`;

      const pushSent = await sendPushNotification(
        notificationToken,
        notificationTitle,
        notificationMessage
      );

      // Save notification to database
      if (userId) {
        try {
          await saveNotificationToDatabase(
            notificationTitle,
            notificationMessage,
            userId,
            bookingId
          );
        } catch (dbError) {
          console.error(
            `❌ Failed to save ${status.toLowerCase()} notification to database:`,
            dbError
          );
        }
      }

      if (pushSent) {
        res.status(200).json({
          success: true,
          message: `Booking ${status.toLowerCase()} notification sent.`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Booking ${status.toLowerCase()} but notification failed.`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Booking status is '${status}'. No action taken.`,
      });
    }
  } catch (error) {
    console.error("❌ Error fetching booking data or generating PDF:", error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

module.exports = router;
