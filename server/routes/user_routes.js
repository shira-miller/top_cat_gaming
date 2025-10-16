import express from "express";
import {
  addUserController,
  updateScoreController,
  getTopController,
  getUserAroundController,
  getLastUsersController
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/", addUserController);
router.put("/:id/score", updateScoreController);
router.get("/top", getTopController);
router.get("/:id/around", getUserAroundController);
router.get("/last", getLastUsersController);
export default router;
