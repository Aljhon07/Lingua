require("dotenv").config()
const express = require("express")
const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const { transcribeFile, synthesizeAudio } = require("./services/speech");

const app = express()
app.use(express.json())
app.use(cors())

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "php" } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      payment_method_types: ["card"],
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})




app.post("/transcribe", upload.single("audio"), transcribeFile);
app.post("/synthesize", synthesizeAudio);

app.get("/", (req, res) => {
  res.send("Hello World!")
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
