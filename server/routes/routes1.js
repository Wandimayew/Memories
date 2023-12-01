import express from "express";
import {
  addUser,
  editUserPassword,
  getUserById,
  login,
  editUser,
} from "../controler/userController.js";

const router1 = express.Router();

router1.post("/register", addUser);
router1.get("/home/:id", getUserById);
router1.post("/login", login);
router1.put("/edit/:id", editUser);
router1.put("/edit/password/:id", editUserPassword);

export default router1;
