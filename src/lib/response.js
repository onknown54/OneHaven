class Response {
  constructor(res) {
    this.res = res;
  }

  success(data = {}, message = "Success", statusCode = 200) {
    return this.res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  created(data = {}, message = "Resource created successfully") {
    return this.success(data, message, 201);
  }

  error(message = "An error occurred", statusCode = 500, errors = null) {
    return this.res.status(statusCode).json({
      status: "error",
      message,
      errors: errors ?? undefined,
    });
  }

  notFound(message = "Resource not found") {
    return this.error(message, 404);
  }

  badRequest(message = "Bad request", errors = []) {
    return this.error(message, 400, errors);
  }

  unauthorized(message = "Unauthorized") {
    return this.error(message, 401);
  }

  forbidden(message = "Forbidden") {
    return this.error(message, 403);
  }

  conflict(message = "Conflict") {
    return this.error(message, 409);
  }
}

export default Response;
