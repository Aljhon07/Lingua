const router = require("express").Router();
const axiosInstance = require("../utils/axiosInstance");
const PDFDocument = require("pdfkit");
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

// Horizontal line helper
const addSeparator = (doc, width = 500) => {
  doc
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + width, doc.y)
    .strokeColor("gray")
    .stroke();
  doc.moveDown();
};

// Generate PDF content
const generateBookingPDF = (doc, bookingData) => {
  const { ticket, passengers } = bookingData;

  doc
    .fontSize(20)
    .text("Flight Booking Details", { align: "center" })
    .moveDown();

  doc.fontSize(14).text("Booking Info", { underline: true }).moveDown(0.5);
  doc
    .fontSize(12)
    .text(`Booking ID: ${bookingData.id}`)
    .text(`Status: ${bookingData.status}`)
    .text(`Payment Method: ${bookingData.payment_method}`)
    .text(`Total Price: ₱${bookingData.total_price}`)
    .moveDown();

  doc.fontSize(14).text("Flight Info", { underline: true }).moveDown(0.5);
  doc
    .fontSize(12)
    .text(`Ticket ID: ${ticket.id}`)
    .text(`Type: ${ticket.type}`)
    .text(`Departure: ${ticket.departure_location}`)
    .text(`Arrival: ${ticket.arrival_location}`)
    .text(
      `Departure Time: ${new Date(ticket.departure_schedule).toLocaleString()}`
    )
    .text(`Arrival Time: ${new Date(ticket.arrival_schedule).toLocaleString()}`)
    .moveDown();

  doc.fontSize(14).text("Passengers", { underline: true }).moveDown(0.5);
  passengers.forEach((p, i) => {
    doc
      .fontSize(12)
      .text(`Passenger ${i + 1}: ${p.name}`)
      .text(`Seat: ${p.seat || "Not assigned"}`)
      .text(`Ticket Number: ${p.ticket_number || "Pending"}`)
      .moveDown();

    if (i < passengers.length - 1) addSeparator(doc);
  });

  doc
    .moveDown(2)
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Thank you for booking with Lingua! We wish you a safe and pleasant journey.",
      { align: "center" }
    );
};

router.post("/booking", async (req, res) => {
  const bookingId = req.query.key;

  try {
    const { data: response } = await axiosInstance.get(
      `/items/booking/${bookingId}?fields=*,ticket.*,passengers.name,passengers.ticket_number,passengers.seat,user_created.notification_id,user_created.id,ticket.travel_package.name,booking_details_pdf`
    );
    const bookingData = response.data;
    const status = bookingData.status;
    const notificationToken = bookingData.user_created?.notification_id;
    const userId = bookingData.user_created?.id;
    const travelPackageName =
      bookingData.ticket?.travel_package?.name || "Travel Package";

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

      const doc = new PDFDocument({ margin: 50 });
      const fileStream = fs.createWriteStream(pdfPath);
      doc.pipe(fileStream);

      generateBookingPDF(doc, bookingData);
      doc.end();

      fileStream.on("finish", async () => {
        console.log(`✅ PDF saved on server: ${pdfPath}`);

        try {
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
        } catch (uploadError) {
          console.error(
            "❌ Error in PDF upload or notification process:",
            uploadError
          );
          res.status(500).json({
            error: "PDF generated but upload or notification failed",
          });
        }
      });

      fileStream.on("error", (err) => {
        console.error("❌ PDF write error:", err);
        res.status(500).json({ error: "Failed to write PDF to server" });
      });
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
