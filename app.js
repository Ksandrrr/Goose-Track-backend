import express from 'express'
import logger  from 'morgan'
import cors from 'cors'
import "dotenv/config.js";
import taskRouter from "./routes/api/task.js"
import authRouter from './routes/api/auth.js'
import reviewsRouter from './routes/api/reviews.js'
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger)) 
app.use(cors())
app.use(express.json())

app.use("/reviews", reviewsRouter)
app.use("/users", authRouter)
app.use('/api/task', taskRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Rout Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message })
})

export default app

