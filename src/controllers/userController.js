import { sendError, sendSuccess } from "../utils/helperUtils.js"

export default class UserController {
  constructor(userService, logger) {
    this.userService = userService
    this.logger = logger
  }

  async signup(req, res, next) {
    try {
      const { email, phoneNumber, userName } = req.body
      const result = await this.userService.signup(email, phoneNumber, userName)
      sendSuccess(res, result)("Signup successful.")
    } catch (error) {
      sendError(next, res)(error)
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.id
      const user = await this.userService.getUserById(userId)
      res.status(200).json(user)
    } catch (error) {
      sendError(next, res)(error)
    }
  }
}
