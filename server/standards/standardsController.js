const standards = require('./standardsModel')

add = (req, res) => {
  var validationError = []

  if (!req.body.standardName) validationError.push('standards Name is required')

  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: 'Validation error',
      errors: validationError,
    })
  } else {
    standards
      .findOne({ standardName: req.body.standardName })
      .then((standardsData) => {
        if (!standardsData) {
          let standardsObj = new standards()
          standardsObj.standardName = req.body.standardName
          standardsObj
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
  var totaldocuments = await standards.countDocuments().exec()

  standards
    .find()
    .then((standardsdata) => {
      res.json({
        status: 200,
        success: true,
        message: 'Data Loaded',
        total: totaldocuments,
        data: standardsdata,
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
    standards
      .findOne({ _id: req.body._id })
      .then((standardsData) => {
        if (!standardsData) {
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
            data: standardsData,
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
    standards
      .findOne({ _id: req.body._id })
      .then((standardsData) => {
        if (!standardsData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          if (req.body.standardsName)
            standardsData.standardsName = req.body.standardsName
          standardsData.save().then((saveRes) => {
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
    standards
      .findOne({ _id: req.body._id })
      .then((standardsData) => {
        if (!standardsData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          standards
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
    standards
      .findOne({ _id: req.body._id })
      .then((standardsData) => {
        if (!standardsData) {
          res.json({
            status: 404,
            success: false,
            message: 'Record not found',
          })
        } else {
          standardsData.status = false
          standardsData
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
