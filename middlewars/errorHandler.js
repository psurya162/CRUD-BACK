// not Found

const notFound = (req, res, next) => {
  const error = new Error(`not FOund : ${req.orignalUrl}`);
  res.status(400);
  next(error);
};

// Error Handling

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statuscode === 200 ? 500 : res.statuscode;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { errorHandler, notFound };
