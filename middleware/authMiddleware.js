const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If no header
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Split "Bearer TOKEN"
    const token = authHeader.split(" ")[1];

    // If token missing
    if (!token) {
      return res.status(401).json({ message: "Token format invalid" });
    }

    // Verify token
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};