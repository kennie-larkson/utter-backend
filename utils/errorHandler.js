import ErrorResponse from "./errorResponse.js";

const errorHandler = (err, req, res, next) => {
  let error = {...err};

  error.message = err.message;

  //log to console for dev

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose A required filed is missing in the document
  if(err.type === "entity.parse.failed") {
    const message = "Check that you have entered the necessary fields"
    error = new ErrorResponse(message, 400)
    // console.log(error)
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
    
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",

  });
}

export default errorHandler;
