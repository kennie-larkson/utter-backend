import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  getUserByEmailAndPassword,
} from "./userController.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/user").get(getUserByEmailAndPassword);
router.route("/:id").get(getUser).patch(updateUser).post(updateUser);

export default router;
