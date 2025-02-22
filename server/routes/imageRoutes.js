// server/routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const { generateImage, generateBackgroundImage } = require("../services/openaiService");

router.post("/generate-background", async (req, res) => {
  const { description } = req.body;
  try {
    const imageUrl = await generateBackgroundImage(
      description,
      process.env.OPENAI_API_KEY,
    );
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/generate-image", async (req, res) => {
    const { description } = req.body;
    try {
      const imageUrl = await generateImage(
        description,
        process.env.OPENAI_API_KEY,
      );
      res.json({ imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;