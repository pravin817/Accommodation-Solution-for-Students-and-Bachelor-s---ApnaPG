const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// configure the dotenv
dotenv.config();

// MongoDB connection
connectDB();

const app = express();

//parse the data
app.use(express.json());
app.use(cors());

// get the PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`The server is running of the PORT : ${PORT}`);
});
