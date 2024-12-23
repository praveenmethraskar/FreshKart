import dotenv from 'dotenv'
import awilix from 'awilix'
import { asClass, asValue } from 'awilix'

// Dependencies
import express from 'express'
import mongoose from './mongo.js'
import UserRouter from '../routes/userRoutes.js'
import UserController from '../controllers/userController.js'
import UserService from '../services/userService.js'
import UserRepository from '../repositories/userRepository.js'
import config from './config.js'
import logger from '../logging/logger.js'

dotenv.config()

let container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC
})

const app = express()

container.register({
  // Register the Express app instance as a value
  app: asValue(app),
  /**
  * Logger instance for logging throughout the application.
  * @type {Object}
  */
  logger: asValue(logger),

  // Routers
  userRoutes: asClass(UserRouter).scoped(),

  // Controllers
  userController: asClass(UserController).scoped(),
  
  // Services
  userService: asClass(UserService),
  
  // Repositories
  userRepository: asClass(UserRepository).inject(() => ({ db: mongoose })),

  // Configuration
  config: asValue(config)
})

// Connect to MongoDB
mongoose.run()

export default container