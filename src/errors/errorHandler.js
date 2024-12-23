export default function errorHandler(err, req, res, next) {
  let code = 500
  let message = "An internal server error has occurred."

  switch (err.type) {
    case "INTERNAL_SERVER_ERROR":
      code = 500
      message = "An unexpected error occurred while processing your request"
      break
    case "USER_NOT_FOUND":
      code = 404
      message = "User not found."
      break
    case "INVALID_PHONE_NUMBER":
      code = 400
      message = "Enter valid Phone number"
      break
    case "INVALID_EMAIL":
      code = 400
      message = "Enter valid email"
      break
    default:
      break
  }

  if (err.message) {
    message = err.message
  }

  res.status(code).json({ error: err.type, message })
}
