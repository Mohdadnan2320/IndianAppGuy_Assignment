require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const pptRoutes = require('./routes/pptRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigin = process.env.FRONTEND_URL;

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json({ limit: "2mb" }));

app.use("/api/chat", chatRoutes);
app.use("/api/ppt", pptRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
