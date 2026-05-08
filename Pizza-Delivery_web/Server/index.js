const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");
const port = process.env.PORT;


const AuthRoutes = require("./routes/AuthRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const ProductRoutes = require("./routes/ProductRoutes");

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: "10kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests, please try again later." }
});
app.use("/api/user/login", authLimiter);
app.use("/api/user/signup", authLimiter);
app.use("/api/user/request_password_reset", authLimiter);


app.use("/api/user", AuthRoutes);
app.use("/api/order", OrderRoutes); 
app.use("/api/product", ProductRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port : ${port}`);
});