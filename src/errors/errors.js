class ApiError extends Error {
  statusCode;

  constructor(message, ErrorName, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = ErrorName;
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(message, "BadRequestError", 400);
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message, "NotFoundError", 404);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, "UnauthorizedError", 401);
  }
}
class ServerError extends ApiError {
  constructor(message) {
    super(message, "Internal Server Error", 401);
  }
}
module.exports = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ApiError,
  ServerError,
};
