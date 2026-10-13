
const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal server error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Database validation failed";

        const errors = Object.values(err.errors).map((item) => ({
            field: item.path,
            message: item.message,
        }));

        return res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid data format";
    }

    if (err.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists";
    }

    if (statusCode >= 500 && process.env.NODE_ENV === "production") {
        message = "Internal server error";
    }

    console.error(err);

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
