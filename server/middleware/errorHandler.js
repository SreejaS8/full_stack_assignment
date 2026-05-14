export default function errorHandler(error, _req, res, _next) {
  const status = error.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({
    message: error.message || 'Unexpected server error',
  });
}
