import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import UserController from "./controllers/userController.js"
import UserService from "./services/userService.js"
import UserRepository from "./repositories/userRepository.js"
import UserRouter from "./routes/userRoutes.js"
import errorHandler from "./errors/errorHandler.js"
import logger from "./logging/logger.js"
import container from "./config/container.js"
import config from "./config/config.js"

dotenv.config()

const app = express()
let environment = process.env.NODE_ENV // development
app.use(express.json())

//mongoose.connect(process.env.NODE_ENV, { useNewUrlParser: true, useUnifiedTopology: true });

const userRepository = new UserRepository()
const userService = new UserService(userRepository, logger)
const userController = new UserController(userService, logger)
new UserRouter(userController, app, logger)

app.use(errorHandler)

if (environment === "development") {
  logger.debug("Development environment detected")
  app.listen(config[environment].port, () => {
    logger.info(`Server now listening at localhost:${config[environment].port}`)
  })
} else if (environment === "production") {
  logger.info("Production environment detected")
  app.listen(process.env.PORT, () => {
    logger.info(`Server now listening at localhost:${process.env.PORT}`)
  })
} else if (environment === "testing") {
  logger.debug("Testing environment detected")
  const server = app.listen(0, () => {
    const port = server.address().port
    logger.info(`Server now listening at localhost:${port}`)
  })
}

export default app
