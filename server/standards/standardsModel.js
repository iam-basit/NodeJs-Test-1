const mongoose = require('mongoose')

const standards = new mongoose.Schema({
  standardName: { type: String, default: null },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model('standards', standards)
