const FirebaseContainer = require('./firebase/Contenedor.js')
const DB = new FirebaseContainer('users')

function addUser({ email, password }) {
    return DB.save({ email, password })
  }
  
  function getAllUsers() {
    return DB.getAll()
  }
  
  module.exports = {
    addUser,
    getAllUsers,
  }