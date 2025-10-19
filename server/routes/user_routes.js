import express from "express";
import {
  addUserController,
  // updateScoreController,
  getTopController,
  getUserAroundController,
  getsmallestUsersController,
  deleteUserController,
  getUserByIdController,
  updateUserController
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/", addUserController);
// router.put("/:id/score", updateScoreController);
router.put("/:id", updateUserController);
router.get("/top", getTopController);
router.get("/:id/around", getUserAroundController);
router.get("/smallest", getsmallestUsersController);
router.delete("/:id", deleteUserController);
router.get("/:id", getUserByIdController);

export default router;
