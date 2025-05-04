import mongoose from "mongoose";

const englishScoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  progress: [
    {
      chapterName: String,
      correctAnswers: {
        type: Number,
        default: 0,
      },
      wrongAnswers: {
        type: Number,
        default: 0,
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
  ],
  aiFeedback: {
    overallPerformance: String,
    chaptersToFocusOn: [String],
    personalizedSuggestions: String,
  },
});

const EnglishScore = mongoose.model("engScore", englishScoreSchema);

export default EnglishScore;
