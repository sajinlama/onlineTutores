import { useParams, Navigate } from "react-router-dom";
import QuizEngine from "./QuizEngine";

// Map URL parameter names to specific endpoint setups
const SUBJECT_CONFIG: Record<string, { name: string; get: string; submit: string }> = {
  maths: {
    name: "Mathematics",
    get: "http://localhost:5001/api/getmathQuestion",
    submit: "http://localhost:5001/api/updateScore"
  },
  science: {
    name: "Science",
    get: "http://localhost:5001/api/getScienceQuestion",
    submit: "http://localhost:5001/api/updateScince"
  },
  english: {
    name: "English",
    get: "http://localhost:5001/api/getEnglishQuestion",
    submit: "http://localhost:5001/api/updateEng"
  }
};

export default function SubjectQuizWrapper() {
  const { subjectId } = useParams<{ subjectId: string }>();
  console.log("this is subject id ",subjectId)

  const config = subjectId ? SUBJECT_CONFIG[subjectId.toLowerCase()] : null;

  // Fallback if someone types an invalid subject like /home/quiz/history
  if (!config) {
    return <Navigate to="/home" replace />;
  }

  return (
    <QuizEngine 
      subjectName={config.name}
      getEndpoint={config.get}
      submitEndpoint={config.submit}
    />
  );
}