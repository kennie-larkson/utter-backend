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
router.route("/login").post(getUserByEmailAndPassword);
router.route("/:id").get(getUser).patch(updateUser).post(updateUser);

// updated for quick deployment!
/**
 * ! add the cookie
 * ! add middleware to check cookie
 * ! add middleware to campaigners
 * ! test the campaign
 * ! set env variables
 */

export default router;
