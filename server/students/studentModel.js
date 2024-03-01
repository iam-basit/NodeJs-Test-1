const mongoose = require('mongoose')

const student = new mongoose.Schema({
  standard: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'standards',
  },
  studentName: { type: String, default: null },
  admissionNumber: { type: Number, default: null },
  contact: { type: Number, default: null },
  fatherName: { type: String, default: null },
  motherName: { type: String, default: null },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model('students', student)
