const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  // id: {
  //   required: true,
  //   type: Number,
  //   unique: true
  // },
  title: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: Number
  },
  genre: {
    type: Array
  }
})

module.exports = mongoose.model('Movie', movieSchema)