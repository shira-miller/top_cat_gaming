import {
  addUser,
  updateUserScore,
  getTopUsers,
  getUserWithNeighbors,
  getLastUsers
} from "../services/user_service.js";

export async function addUserController(req, res) {
  try {
    const { name, image, score } = req.body;
    const user = await addUser(name, image, score);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateScoreController(req, res) {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const updated = await updateUserScore(id, score);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTopController(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await getTopUsers(limit);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUserAroundController(req, res) {
  try {
    const { id } = req.params;
    const data = await getUserWithNeighbors(id);
    if (!data) return res.status(404).json({ message: "User not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getLastUsersController(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const users = await getLastUsers(limit);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
