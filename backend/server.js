const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const auth = require("./routes/auth");

const app = express();

// configure the dotenv
dotenv.config();

// MongoDB connection
connectDB();

//parse the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/v1/auth", auth);

// get the PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`The server is running of the PORT : ${PORT}`);
});
