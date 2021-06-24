import express from "express"
import { createUser, getAllUsers, getUser, updateUser } from "./userController.js"

const router = express.Router()

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).post(updateUser)

export default router