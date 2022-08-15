const statusByErrorType = {
  'string.min': 422,
  'any.required': 400,
  'number.integer': 404,
};

const mountObjErrorJoi = (err) => ({
  error: {
    status: statusByErrorType[err.error.details[0].type],
    message: err.error.details[0].message,
  },
});

const mountObjError = (code, mess) => ({
  error: {
    status: code,
    message: mess,
  },
});

module.exports = { statusByErrorType, mountObjErrorJoi, mountObjError };