// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());

// Import and use routes
const imageRoutes = require("./routes/imageRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use("/api", imageRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
