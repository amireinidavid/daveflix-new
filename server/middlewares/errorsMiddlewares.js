// error handling

export const errorHandling = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.Node_env === "production" ? null : err.stack,
  });
};
