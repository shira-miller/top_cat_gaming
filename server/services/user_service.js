import { User } from "../models/user_model.js";

export async function addUser(name, image, score = 0) {
  return await User.create({ name, image, score });
}

export async function updateUserScore(id, score) {
  const updated = await User.findByIdAndUpdate(id, { score }, { new: true });
  return updated;
}

export async function getTopUsers(limit = 10) {
  return await User.find({}, { name: 1, image: 1, score: 1 })
    .sort({ score: -1 })
    .limit(limit);
}

export async function getUserWithNeighbors(userId) {
  const user = await User.findById(userId, { name: 1, image: 1, score: 1 });
  if (!user) return null;

  const higher = await User.countDocuments({ score: { $gt: user.score } });
  const rank = higher + 1;

  const above = await User.find({ score: { $gt: user.score } }, { name: 1, image: 1, score: 1 })
    .sort({ score: 1 })
    .limit(5);

  const below = await User.find({ score: { $lt: user.score } }, { name: 1, image: 1, score: 1 })
    .sort({ score: -1 })
    .limit(5);

  return { user, rank, above, below };
}

export async function getLastUsers(limit = 3) {
  return await User.find({}, { name: 1, image: 1, score: 1 })
    .sort({ _id: -1 })
    .limit(limit);
}
