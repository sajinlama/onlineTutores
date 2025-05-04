import UserProgress from "../../models/users/userProgress.models.js";

const getTotalScore = async (req, res) => {
  try {
    const questions = await UserProgress.find(); // no filter, get all documents
    res.status(200).json(questions); // send all user progress data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getTotalScore;
