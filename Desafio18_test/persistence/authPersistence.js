import AuthRepository from './repository/AuthRepository.js'
const authRepository = new AuthRepository()

function addUser({ email, password }) {
  return authRepository.save({ email, password })
}

function getAllUsers() {
  return authRepository.getAll()
}

export default {
  addUser,
  getAllUsers,
}