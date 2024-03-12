require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJwtToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Bearer TOKEN
  const token = authHeader ? authHeader.split(" ")[1] : null;
  console.log(token);

  if (!token) {
    res.status(401).json({ message: "Unauthorized access", success: false });
  }

  // verify the jwtToken

  try {
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decode._id);
    req.user = decode._id;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Access denied, Invalid Token", success: false });
  }
};
