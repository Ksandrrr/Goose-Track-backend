const express = require('express')
const controllersTask = require("../../controllers/task")
const router = express.Router()
const schemas = require("../../models/task");
const validateBody = require("../../utils/validateBody")
const isValideId = require("../../middlewares/isValideId")

const authenticate = require("../../middlewares/authenticate")

router.use(authenticate);


router.get('/TaskInMonth', controllersTask.taskInMonth)

router.post('/addTask', validateBody(schemas.taskAddSchema), controllersTask.addTask)

router.put('/:id',isValideId, controllersTask.updateTaskById)

router.delete('/:id',isValideId, controllersTask.removeTask)

 
module.exports = router
