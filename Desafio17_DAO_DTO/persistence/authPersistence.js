const AuthRepository = require('./repository/AuthRepository.js')
const authRepository = new AuthRepository()

function addUser({ email, password }) {
    return authRepository.save({ email, password })
  }
  
  function getAllUsers() {
    return authRepository.getAll()
  }
  
  module.exports = {
    addUser,
    getAllUsers,
  }