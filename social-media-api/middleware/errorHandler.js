const ErrorResponse = require('../utils/errorResponse');

const errorResponse = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;