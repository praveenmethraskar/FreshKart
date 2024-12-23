import validator from "validator"

export default class UserService {
  constructor(userRepository, logger) {
    this.userRepository = userRepository
    this.logger = logger
  }

  async signup(email, phoneNumber, userName) {
    if (!email || !phoneNumber || !userName) {
      throw { type: "REQUIRED_FIELDS", message: "All fields are required" }
    }

    if (!validator.isEmail(email)) {
      throw { type: "INVALID_EMAIL", message: "Enter valid email" }
    }

    if (!validator.isMobilePhone(phoneNumber)) {
      throw {
        type: "INVALID_PHONE_NUMBER",
        message: "Enter valid Phone number",
      }
    }

    const duplicateEmail = await this.userRepository.findByEmail(email)
    if (duplicateEmail) {
      throw { type: "EMAIL_ALREADY_EXISTS", message: "Email already exists" }
    }

    const createdUser = await this.userRepository.addUser(
      email,
      phoneNumber,
      userName
    )
    return {
      name: createdUser.userName,
      email: createdUser.email,
      phone: createdUser.phoneNumber,
    }
  }

  async getUserById(userId) {
    const user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw { type: "USER_NOT_FOUND", message: "User not found." }
    }
    return {
      name: user.userName,
      email: user.email,
      phone: user.phoneNumber
    }
  }
}
