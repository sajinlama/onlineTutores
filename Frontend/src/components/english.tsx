import axios from 'axios';
import { useEffect, useState } from 'react';

function English() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timerValue, setTimerValue] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [animateQuestion, setAnimateQuestion] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/getEnglishQuestion');
        setQuestions(res.data);
        setLoading(false);
        setTimerActive(true);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && timerValue > 0) {
      timer = setInterval(() => {
        setTimerValue((prev) => prev - 1);
      }, 1000);
    } else if (timerValue === 0 && !quizComplete) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [timerActive, timerValue, quizComplete]);

  useEffect(() => {
    setAnimateQuestion(true);
    const timer = setTimeout(() => {
      setAnimateQuestion(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) return;

    const selectedAnswer = questions[currentQuestion].options[selectedOptionIndex];
    console.log("this is selected ans",selectedAnswer)
    const correctAnswer = questions[currentQuestion].correctOption;

    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: questions[currentQuestion]._id,
        selectedAnswer: selectedAnswer,
        chapterName: questions[currentQuestion].chapterName,
      },
    ];
    setUserAnswers(updatedAnswers);
    console.log("this is userans",userAnswers);

    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setTimerValue(60);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTimerActive(false);
      setQuizComplete(true);
      submitAllAnswers();
    }
  };

  const submitAllAnswers = async () => {
    setSubmitting(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }
      
      const chapterName = questions[0]?.chapterName || 'Unknown Chapter';
      const level = questions[0]?.level || 'Unknown Level';
      console.log("the user ans is ",userAnswers);

      console.log(userAnswers);

      const response = await axios.post('http://localhost:5001/api/updateEng', {
        userId,
        chapterName,
        answers: userAnswers,
        level,
      });

      setScore(response.data.correctAnswers);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError(error.message || 'Failed to submit answers. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setTimerValue(60);
    setQuizComplete(false);
    setTimerActive(true);
    setUserAnswers([]);
    setFeedback(null);
    setError('');
  };

  const containerClasses = "flex items-center justify-center w-80vw h-70vh mx-auto";

  if (loading) {
    return (
      <div className={containerClasses}>
        <div className="text-center p-10 bg-white rounded-xl shadow-lg w-full">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
          <p className="text-xl mt-6 text-gray-600">Loading questions...</p>
          <div className="mt-8">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClasses}>
        <div className="text-center p-10 bg-white rounded-xl shadow-lg w-full border-gray-200 border-2">
          <div className="text-gray-800 text-xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
          <button 
            className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-md transform hover:scale-105 active:scale-95 transition-transform" 
            onClick={resetQuiz}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className={containerClasses}>
        <div className="p-8 w-[70vw] h-[calc(100vh-55px)] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-y-auto flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">Quiz Completed!</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </h2>
            <div className="bg-black text-white px-5 py-2 rounded-full font-medium shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Score: {score}/{questions.length}
            </div>
          </div>
          
          {submitting ? (
            <div className="flex flex-col items-center py-12 flex-grow">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Submitting your answers...</p>
            </div>
          ) : feedback ? (
            <div className="bg-gray-50 p-6 rounded-xl flex-grow flex flex-col shadow-inner">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Performance Summary
              </h3>
              <p className="text-gray-700 mb-6 bg-white p-4 rounded-lg shadow-sm">{feedback.overallPerformance}</p>
              
              {feedback.weakChapters && feedback.weakChapters.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Weak Areas:
                  </h4>
                  <ul className="list-none ml-6 space-y-2 text-gray-700">
                    {feedback.weakChapters.map((ch, idx) => (
                      <li key={idx} className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {ch}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Areas to Improve:
                </h4>
                <ul className="list-none ml-6 space-y-2 text-gray-700">
                  {feedback.chaptersToFocusOn?.map((ch, idx) => (
                    <li key={idx} className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                      {ch}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6 flex-grow">
                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-black" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Personalized Suggestions:
                </h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {Array.isArray(feedback.personalizedSuggestions) ? (
                    <ol className="list-none space-y-3 pl-0">
                      {feedback.personalizedSuggestions.map((suggestion, idx) => {
                        const cleanSuggestion = suggestion
                          .replace(/^\d+\.\s*/, '')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        
                        return (
                          <li key={idx} className="flex items-start">
                            <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                              {idx + 1}
                            </span>
                            <span 
                              className="text-gray-700"
                              dangerouslySetInnerHTML={{ __html: cleanSuggestion }}
                            />
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p className="whitespace-pre-wrap text-gray-700">
                      {feedback.personalizedSuggestions}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-auto">
                <button
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-md flex items-center transform hover:scale-105 active:scale-95 transition-transform"
                  onClick={resetQuiz}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={containerClasses}>
      <div className="p-8 mx-10 w-[70vw] h-[calc(100vh-55px)] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">{current.chapterName}</h2>
            </div>
            <span className="text-gray-500 text-sm ml-8">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`font-medium px-4 py-2 rounded-full flex items-center ${
              timerValue < 10 
                ? 'bg-gray-100 text-black font-bold' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {timerValue}s
            </span>
            <span className="text-sm bg-black text-white px-3 py-1 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {current.level}
            </span>
          </div>
        </div>
        
        <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-2 bg-black rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className={`text-xl font-medium mb-8 text-gray-800 p-6 bg-gray-50 rounded-lg shadow-inner transform transition-opacity duration-300 ${animateQuestion ? 'opacity-0' : 'opacity-100'}`}>
          {current.question}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              className={`p-5 rounded-xl text-left transition-all duration-200 transform hover:scale-102 ${
                selectedOptionIndex === idx
                  ? 'bg-black text-white shadow-lg scale-102'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-100 hover:shadow-md'
              }`}
              onClick={() => handleOptionSelect(idx)}
            >
              <div className="flex items-center">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm mr-3 ${selectedOptionIndex === idx ? 'bg-white text-black' : 'bg-gray-200 text-gray-700'}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </div>
            </button>
          ))}
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOptionIndex === null}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-200 transform ${
              selectedOptionIndex === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 shadow-md hover:scale-105 active:scale-95'
            } flex items-center justify-center ml-auto`}
          >
            <span>Submit Answer</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default English;