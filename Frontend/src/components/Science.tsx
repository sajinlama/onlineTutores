import QuizEngine from "./QuizEngine";

export default function Science() {
  return (
    <QuizEngine 
      subjectName="Science"
      getEndpoint="http://localhost:5001/api/getScienceQuestion"
      submitEndpoint="http://localhost:5001/api/updateScince" 
    />
  );
}