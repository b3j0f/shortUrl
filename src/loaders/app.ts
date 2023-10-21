import express, { type Application } from 'express'
import cors from 'cors'

import routes from '../routes'
import jobs from '../jobs'

const app: Application = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

routes(app)
jobs(app)

export default app
