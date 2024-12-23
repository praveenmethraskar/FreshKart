export function sendError(next, res) {
  return (error) => {
    next(error)
  }
}

export function sendSuccess(res, result) {
  return (message) => {
    res.status(200).json({ message: message || "Success", user: result })
  }
}
