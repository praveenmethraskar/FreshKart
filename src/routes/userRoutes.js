import express from "express"

export default class UserRouter {
  constructor(userController, app, logger) {
    this.userController = userController
    this.app = app
    this.logger = logger
    this.router = express.Router()

    this.router.get("/:id", this.getUser.bind(this))
    this.router.post("/signup", this.signup.bind(this))

    this.app.use("/user", this.router)
  }

  async signup(req, res, next) {
    await this.userController.signup(req, res, next)
  }

  async getUser(req, res, next) {
    await this.userController.getUser(req, res, next)
  }
}
