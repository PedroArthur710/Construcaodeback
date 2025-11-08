// src/validators/IDValidator.js
const mongoose = require('mongoose')

function validarObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = { validarObjectId }
