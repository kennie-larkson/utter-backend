import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./components/users/userRoute.js"
import { errorHandler } from "./utils/errorHandler.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/',( req, res ) => {
    res.send('Hey! the UtterUsers server is live...')
})

app.use('/api/v1/users', userRoute)
app.use(errorHandler)
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'Failed',
        message: `Can't find ${req.originalUrl} on this server `,    })
})


export default app