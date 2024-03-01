const student = require('./studentModel')

add = (req, res) => {
  var validationError = []

  if (!req.body.studentName) validationError.push('Student Name is required')
  if (!req.body.standard) validationError.push('Standard Name is required')

  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation error',
      errors: validationError,
    })
  } else {
    student
      .findOne({ admissionNumber: req.body.admissionNumber })
      .then((studentData) => {
        if (!studentData) {
          let studentObj = new student()
          studentObj.standard = req.body.standard
          studentObj.studentName = req.body.studentName
          studentObj.admissionNumber = req.body.admissionNumber
          studentObj.contact = req.body.contact
          studentObj.fatherName = req.body.fatherName
          studentObj.motherName = req.body.motherName
          studentObj
            .save()
            .then((saveRes) => {
              res.json({
                status: 200,
                success: true,
                message: 'Record Inserted',
                data: saveRes,
              })
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error: err.message,
              })
            })
        } else {
          res.json({
            status: 422,
            success: false,
            message: 'Record already exists',
          })
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: 'Internal Server Error',
          errors: err.message,
        })
      })
  }
}

getAllData = async (req, res) => {
  var totaldocuments = await student.countDocuments().exec()

  student
    .find()
    .populate('standard')
    .then((studentdata) => {
      res.json({
        status: 200,
        success: true,
        message: 'Data Loaded',
        total: totaldocuments,
        data: studentdata,
      })
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: 'Internal Server error',
        errors: err.message,
      })
    })
}

getSingleData = (req, res) => {
  var validationError = []

  if (!req.body._id) validationError.push('Id is required')

  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation error',
      errors: validationError,
    })
  } else {
    student
      .findOne({ _id: req.body._id })
      .then((studentData) => {
        if (!studentData) {
          res.json({
            status: 404,
            success: false,
            message: 'Data not found',
          })
        } else {
          res.json({
            status: 200,
            success: true,
            message: 'Data Loaded',
            data: studentData,
          })
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: 'Internal Server Error',
          errors: err.message,
        })
      })
  }
}

updateData = (req, res) => {
  validationError = []
  if (!req.body._id) validationError.push('Id is Required')
  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation Error',
      errors: validationError,
    })
  } else {
    student
      .findOne({ _id: req.body._id })
      .then((studentData) => {
        if (!studentData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          if (req.body.admissionNumber)
            studentObj.studentName = req.body.studentName
          studentObj.admissionNumber = req.body.admissionNumber
          studentObj.contact = req.body.contact
          studentObj.fatherName = req.body.fatherName
          studentObj.motherName = req.body.motherName
          studentObj.save().then((saveRes) => {
            res.json({
              status: 200,
              success: true,
              message: 'Record Updated',
              data: saveRes,
            })
          })
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: 'Internal Server Error',
          errors: err.message,
        })
      })
  }
}

deleteData = (req, res) => {
  let validationError = []

  if (!req.body._id) validationError.push('Id is required')

  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation error',
      errors: validationError,
    })
  } else {
    student
      .findOne({ _id: req.body._id })
      .then((studentData) => {
        if (!studentData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          student
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.json({
                status: 200,
                success: true,
                message: 'Record Deleted',
              })
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: 'Internal Server Error',
                errors: err.message,
              })
            })
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: 'Internal Server Error',
          errors: err.message,
        })
      })
  }
}

softDelete = (req, res) => {
  let validationError = []

  if (!req.body._id) validationError.push('Id is required')

  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation error',
      errors: validationError,
    })
  } else {
    student
      .findOne({ _id: req.body._id })
      .then((studentData) => {
        if (!studentData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          studentData.status = false
          studentData
            .save()
            .then(() => {
              res.json({
                status: 200,
                success: true,
                message: 'Record Deleted',
              })
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: 'Internal Server Error',
                errors: err.message,
              })
            })
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: 'Internal Server Error',
          errors: err.message,
        })
      })
  }
}

module.exports = {
  add,
  getAllData,
  getSingleData,
  deleteData,
  softDelete,
  updateData,
}
