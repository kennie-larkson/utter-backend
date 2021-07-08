import express from "express"

import { createResponder, getAllResponders } from "./respondersController.js"


const router = express.Router()

router.route("/register").post(createResponder)
router.route("/responder").get(getAllResponders)


export default router
