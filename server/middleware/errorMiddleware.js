const notFound = (req, res, next) => {
  const error = new Error('Route not found:' + req.orignalUrl)
  req.status(500)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
}

export { notFound, errorHandler }
