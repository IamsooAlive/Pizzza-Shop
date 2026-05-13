const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal server error",
    });
};

module.exports = { notFound, errorHandler };
