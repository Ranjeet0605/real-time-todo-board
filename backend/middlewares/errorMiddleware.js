module.exports = (err, req, res, next) => {
    // set the status code and message based on the error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    // Log the error for debugging
    console.error(`Error:${message}`);
    // send the error response
    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            statusCode: statusCode,
        }
    })
};
