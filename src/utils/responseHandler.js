function errorHandler(res, errMessage, statusCode) {
  return res.status(statusCode || 500).json({
    success: false,
    message: errMessage,
    code: statusCode,
  });
}

function successHandler(res, successMsg, successData = null) {
  return res.status(200).json({
    success: true,
    message: successMsg,
    data: successData,
  });
}

module.exports = {errorHandler, successHandler};
