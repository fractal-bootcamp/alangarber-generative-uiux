// server/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { generateFont, generateIntro } = require("../services/openaiService");

// Generate a tone-appropriate font based on character description
router.post("/generate-font", async (req, res) => {
  const { description } = req.body;
  try {
    const font = await generateFont(description, process.env.OPENAI_API_KEY);
    res.json({ font });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Generate an introductory message for the chat
router.post("/generate-intro", async (req, res) => {
  const { prompt } = req.body;
  try {
    const introText = await generateIntro(prompt, process.env.OPENAI_API_KEY);
    res.json({ text: introText });
  } catch (error) {
    console.error("Error generating intro:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
