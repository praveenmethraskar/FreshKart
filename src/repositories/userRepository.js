import User from "../models/userModel.js"

export default class UserRepository {
  async addUser(email, phoneNumber, userName) {
    const user = new User({ email, phoneNumber, userName })
    return await user.save()
  }

  async findByEmail(email) {
    return User.findOne({ email })
  }

  async findByPhoneNumber(phoneNumber) {
    return User.findOne({ phoneNumber })
  }

  async findByUserName(userName) {
    return User.findOne({ userName })
  }

  async getUserById(userId) {
    return User.findById(userId)
  }
}
