const router = require("express").Router();
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { v4: randomUUID } = require("uuid");

const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
const axiosInstance = axios.create({
  baseURL: `${process.env.DIRECTUS_SERVER_URL}`,
  timeout: 9500,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.DIRECTUS_STATIC_TOKEN}`,
  },
});

router.post("/google-sign-in", async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));
  const { email, idToken = 1 } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email: googleEmail, picture } = payload;

    if (googleEmail !== email) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const response = await axiosInstance.get(
      "users?filter[email][_eq]=" + email + "&fields=email,id"
    );
    console.log(
      "Directus response data:",
      JSON.stringify(response.data.data, null, 2)
    );

    const user = response.data.data?.[0];
    if (!user) {
      const err = new Error("No user found with the provided email");
      err.status = 404;
      throw err;
    }
    console.log("User found:", JSON.stringify(user, null, 2));
    if (user.email === email) {
      const staticToken = randomUUID();
      const updateResponse = await axiosInstance.patch(`users/${user.id}`, {
        token: staticToken,
        static_token: staticToken,
      });

      console.log(
        "updateResponse = ",
        JSON.stringify(updateResponse.data, null, 2)
      );
      console.log("static_token = ", updateResponse.data?.data?.static_token);
      console.log(
        "updateResponse.status is function:",
        typeof updateResponse.status === "function"
      );
      return res.json({
        access_token: staticToken,
      });
    } else {
      const err = new Error("Unatuthorized user");
      err.status = 401;
      throw err;
    }
  } catch (error) {
    console.error("Err:", JSON.stringify(error, null, 2));
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
