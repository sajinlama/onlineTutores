import QuizEngine from "./QuizEngine";

export default function Maths() {
  return (
    <QuizEngine 
      subjectName="Mathematics"
      getEndpoint="http://localhost:5001/api/getMathsQuestion"
      submitEndpoint="http://localhost:5001/api/updateMaths"
    />
  );
}