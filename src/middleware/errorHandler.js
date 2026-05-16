const ClientError = require("../commons/exceptions/ClientError");

const errorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }

  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: "failed",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "failed",
    message: "Internal server error",
  });
};

module.exports = errorHandler;
