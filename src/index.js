import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import analyze from './routes/analyze'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/analyze', analyze)

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)

export default app