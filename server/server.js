require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  transcribeFile,
  synthesizeAudio,
  listVoices,
} = require("./services/speech");
const { translateText } = require("./services/translate");
const axiosInstance = require("./utils/axiosInstance");
const { default: axios } = require("axios");

const app = express();
app.use(express.static("public"));
app.use("/output", express.static(path.join(__dirname, "output")));
app.use(express.json());
app.use(cors());
app.use("/user", require("./routes/directus_auth"));
app.use("/directus-extensions", require("./routes/directus_extension"));
app.use("/directus-send-notif", require("./routes/directus_notif"));
app.use("/performance", require("./routes/performance"));
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { currency = "php", bookingId } = req.body;
    const { data } = await axiosInstance.get("/items/booking/" + bookingId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.data.total_price * 100,
      currency: currency,
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/transcribe", upload.single("audio"), transcribeFile);
app.post("/synthesize", synthesizeAudio);
app.post("/translate", translateText);
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notif-test", async (req, res) => {
  try {
    console.log("Notification response:", response.data);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
