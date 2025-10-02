const router = require("express").Router();
const axiosInstance = require("../utils/axiosInstance");
const { generateBookingDetails } = require("../utils/ticketDetailsGenerator");

router.post("/create-booking", async (req, res) => {
  try {
    const getBookingRes = await axiosInstance.get(
      "/items/ticket?filter[id]=" + req.body.ticket + "&fields=price",
      req.body
    );
    req.body.status = "Approved";

    req.body.total_price =
      parseFloat(getBookingRes.data.data[0].price) * req.body.passengers.length;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    const userToken = authHeader.split(" ")[1];

    const bookingRes = await axiosInstance.post("/items/booking", req.body, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log("Booking Created");
    return res.status(200).json({ data: bookingRes.data.data });
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/pay-booking", async (req, res) => {
  const { id, paymentId } = req.body;
  try {
    const booking = await axiosInstance.get(`/items/booking/${id}`);
    if (!booking.data.data) {
      const err = new Error("No booking found with the provided id");
      err.status = 404;
      throw err;
    }
    const updateBooking = generateBookingDetails(booking.data.data);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    const userToken = authHeader.split(" ")[1];
    const updatedBooking = await axiosInstance.patch(
      `/items/booking/${id}`,
      {
        status: "Paid",
        payment_id: paymentId,
        ...updateBooking,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log("Booking Paid");
    return res.status(200).json({ data: updatedBooking.data.data });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
