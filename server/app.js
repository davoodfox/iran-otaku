const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Import Routes
const authRoute = require("./routes/auth");
const entriesRoute = require("./routes/entries");

// Connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

// Middleware
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/entries", entriesRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
