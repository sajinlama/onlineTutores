import QuizEngine from "./QuizEngine";

export default function English() {
  return (
    <QuizEngine 
      subjectName="English"
      getEndpoint="http://localhost:5001/api/getEnglishQuestion"
      submitEndpoint="http://localhost:5001/api/updateEng"
    />
  );
}