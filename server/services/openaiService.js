// server/services/openaiService.js
const fetch = require("node-fetch");

async function generateImage(description, apiKey) {
    const prompt = `${description}
    `;
  
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "256x256",
      }),
    });
  
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `OpenAI API error (background): ${response.status} ${errorDetails}`,
      );
    }
  
    const data = await response.json();
    console.log("OpenAI API character image response:", data);
    return data.data[0].url;
  }

async function generateBackgroundImage(description, apiKey) {
  const backgroundPrompt = `
    Create a seamless, repeating background pattern that is visually appealing 
    and clearly reflects a character described as: "${description}". 
    The image should be tileable (no harsh edges) and use a balanced color palette 
    so that it doesn't distract from foreground elements.
  `;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: backgroundPrompt,
      n: 1,
      size: "256x256",
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `OpenAI API error (background): ${response.status} ${errorDetails}`,
    );
  }

  const data = await response.json();
  console.log("OpenAI API background response:", data);
  return data.data[0].url;
}

async function generateFont(description, apiKey) {
  const fontPrompt = `
    Given the character description: "${description}",
    select one tone-appropriate Google Font from among those you know.
    Respond with just the font name.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: fontPrompt }],
        max_tokens: 10,
        temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `OpenAI API error (font): ${response.status} ${errorDetails}`,
    );
  }

  const fontData = await response.json();
  console.log("OpenAI API font response:", fontData);
  return fontData.choices[0].message.content.trim();
}

async function generateIntro(prompt, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 10,
        temperature: 0.5
      })
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `OpenAI API error (intro): ${response.status} ${errorDetails}`,
    );
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

module.exports = { generateImage, generateBackgroundImage, generateFont, generateIntro };
