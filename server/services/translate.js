const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const translate = new Translate({
  credentials: GOOGLE_CREDENTIALS,
  projectId: GOOGLE_CREDENTIALS.project_id,
});

const translateText = async (req, res) => {
  console.log(req.body);
  try {
    const { text, options } = req.body;
    const [translation] = await translate.translate(text, options);
    console.log(`Translation: ${translation}`);
    res.json({ translation });
  } catch (error) {
    console.error("Error translating text:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};

module.exports = { translateText };
