import {
  addUser,
  // updateUserScore,
  getTopUsers,
  getUserWithNeighbors,
  getsmallestUsers,
  deleteUser,
  getUserById,
  updateUser
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

// export async function updateScoreController(req, res) {
//   try {
//     const { id } = req.params;
//     const { score } = req.body;
//     const updated = await updateUserScore(id, score);
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

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

export async function getsmallestUsersController(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const users = await getsmallestUsers(limit);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }   
}

export async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await updateUser(id, updateData);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}