require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const pptRoutes = require("./routes/pptRoutes");

const app = express();
const PORT = process.env.PORT;


const allowedOrigin = process.env.FRONTEND_URL;


app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }

  next();
});

app.use(express.json({ limit: "2mb" }));


app.use("/api/chat", chatRoutes);
app.use("/api/ppt", pptRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Allowed Origin: ${allowedOrigin}`);
});
