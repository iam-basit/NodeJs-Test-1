const router = require('express').Router()
const standardsController = require('../server/standards/standardsController')
const studentController = require('../server/students/studentController')

router.post('/standards/add', standardsController.add)
router.post('/standards/getall', standardsController.getAllData)
router.post('/standards/getsingle', standardsController.getSingleData)
router.post('/standards/delete', standardsController.deleteData)
router.post('/standards/softdelete', standardsController.softDelete)
router.post('/standards/update', standardsController.updateData)

router.post('/student/add', studentController.add)
router.post('/student/getall', studentController.getAllData)
router.post('/student/getsingle', studentController.getSingleData)
router.post('/student/delete', studentController.deleteData)
router.post('/student/softdelete', studentController.softDelete)
router.post('/student/update', studentController.updateData)

module.exports = router
