const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "failed",
        message: "Missing authentication",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.auth = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
