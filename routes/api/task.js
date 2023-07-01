import  express from 'express'
import controllersTask from "../../controllers/task.js"
import {taskAddSchema, getTaskSchema} from "../../models/task.js"
import validateBody from "../../utils/validateBody.js"
import isValideId  from "../../middlewares/isValideId.js"
import authenticate from "../../middlewares/authenticate.js"

const router = express.Router();

router.use(authenticate);

 
router.get('/TaskInMonth', validateBody(getTaskSchema), controllersTask.taskInMonth)

router.post('/addTask', validateBody(taskAddSchema), controllersTask.addTask)

router.put('/:id',isValideId, controllersTask.updateTaskById)

router.delete('/:id',isValideId, controllersTask.removeTask)

 
export default router
