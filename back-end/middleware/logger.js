// Request Logging Middleware
const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log request
  console.log(
    `[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`
  );

  // Track response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.path} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
    res.send = originalSend;
    return res.send(data);
  };

  next();
};

module.exports = logger;
