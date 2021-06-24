import express from "express"
import dotenv from "dotenv"
import userRoute from "./components/users/userRoute.js"

dotenv.config()
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/',( req, res ) => {
    res.send('Hey! the UtterUsers server is live...')
})

app.use('api/v1/users', userRoute)


export default app