"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  BookOpen, Timer, Award, AlertCircle, RefreshCw, 
  ChevronRight, XCircle, ArrowUpRight, HelpCircle, CornerDownLeft
} from "lucide-react";

interface QuizEngineProps {
  getEndpoint: string;
  submitEndpoint: string;
  subjectName: string;
}

export default function QuizEngine({ getEndpoint, submitEndpoint, subjectName }: QuizEngineProps) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timerValue, setTimerValue] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [animateQuestion, setAnimateQuestion] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(getEndpoint);
        setQuestions(res.data);
        setLoading(false);
        setTimerActive(true);
      } catch (err) {
        console.error(`Error fetching ${subjectName} questions:`, err);
        setError("Failed to load evaluation questions. Please verify your connection.");
        setLoading(false);
      }
    };
    getQuestions();
  }, [getEndpoint, subjectName]);

  const handleNextQuestion = useCallback((answersToSubmit: any[]) => {
    setSelectedOptionIndex(null);
    setTimerValue(60);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setTimerActive(false);
      setQuizComplete(true);
      submitAllAnswers(answersToSubmit);
    }
  }, [currentQuestion, questions.length]);

  useEffect(() => {
    let timer: any;
    if (timerActive && timerValue > 0) {
      timer = setInterval(() => {
        setTimerValue((prev) => prev - 1);
      }, 1000);
    } else if (timerValue === 0 && !quizComplete) {
      handleNextQuestion(userAnswers);
    }
    return () => clearInterval(timer);
  }, [timerActive, timerValue, quizComplete, userAnswers, handleNextQuestion]);

  useEffect(() => {
    setAnimateQuestion(true);
    const timeout = setTimeout(() => setAnimateQuestion(false), 200);
    return () => clearTimeout(timeout);
  }, [currentQuestion]);

  const handleOptionSelect = (index: number) => {
    if (submitting) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitAnswer = useCallback(() => {
    if (selectedOptionIndex === null || submitting) return;

    const currentQ = questions[currentQuestion];
    const selectedAnswer = currentQ.options[selectedOptionIndex];
    const correctAnswer = currentQ.correctOption;

    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: currentQ._id,
        selectedAnswer: selectedAnswer,
        chapterName: currentQ.chapterName,
      },
    ];
    setUserAnswers(updatedAnswers);

    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
    }

    handleNextQuestion(updatedAnswers);
  }, [selectedOptionIndex, submitting, questions, currentQuestion, userAnswers, handleNextQuestion]);

  // Keyboard accessibility hook mapping (A-D selection, Enter submission)
  useEffect(() => {
    if (quizComplete || loading || error) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "a") handleOptionSelect(0);
      if (key === "b") handleOptionSelect(1);
      if (key === "c") handleOptionSelect(2);
      if (key === "d") handleOptionSelect(3);
      if (e.key === "Enter" && selectedOptionIndex !== null) {
        handleSubmitAnswer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOptionIndex, quizComplete, loading, error, handleSubmitAnswer]);

  const submitAllAnswers = async (answersToSubmit: any[]) => {
    setSubmitting(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User credentials expired. Please re-authenticate.");
      
      const chapterName = questions[0]?.chapterName || "General Evaluation";
      const level = questions[0]?.level || "Standard";

      const response = await axios.post(submitEndpoint, {
        userId,
        chapterName,
        answers: answersToSubmit,
        level,
      });

      setScore(response.data.correctAnswers);
      setFeedback(response.data.feedback);
    } catch (err: any) {
      console.error("Submission pipeline error:", err);
      setError(err.message || "Server synchronisation failure. Data failed to submit.");
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
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] flex flex-col justify-center items-center gap-3 font-sans antialiased">
        <div className="w-10 h-10 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Parsing Workspace Metrics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] flex items-center justify-center p-6 antialiased font-sans">
        <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-xl">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Pipeline Interruption</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-6">{error}</p>
          <button onClick={resetQuiz} className="h-11 w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer">
            <RefreshCw size={16} />
            <span>Re-initialize Session</span>
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 font-sans antialiased relative p-6 md:p-10 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto space-y-6">
          
          <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-950 dark:bg-zinc-50 rounded-xl flex items-center justify-center text-white dark:text-black">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Assessment Completed</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold mt-0.5">{subjectName} Syllabus Workspace</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-bold text-sm rounded-xl shadow-sm">
              Metrics Score: {score} / {questions.length}
            </div>
          </div>

          {submitting ? (
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-20 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Encrypting Data Pipeline...</p>
            </div>
          ) : feedback ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>Performance Matrix Evaluation</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl">
                    {feedback.overallPerformance}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                    <HelpCircle size={16} />
                    <span>Targeted Strategic Vector Tasks</span>
                  </h3>
                  <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-4">
                    {Array.isArray(feedback.personalizedSuggestions) ? (
                      <ol className="space-y-3">
                        {feedback.personalizedSuggestions.map((suggestion: string, idx: number) => {
                          const cleanText = suggestion
                            .replace(/^\d+\.\s*/, "")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                          return (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                              <span className="w-5 h-5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: cleanText }} className="leading-relaxed" />
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap text-zinc-600 dark:text-zinc-300 leading-relaxed">{feedback.personalizedSuggestions}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {feedback.weakChapters && feedback.weakChapters.length > 0 && (
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 block">Critical Weak Frameworks</span>
                    <div className="space-y-2">
                      {feedback.weakChapters.map((ch: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-red-500/5 dark:bg-red-950/10 border border-red-500/10 rounded-xl text-xs font-medium text-red-600 dark:text-red-400">
                          <XCircle size={14} className="flex-shrink-0" />
                          <span>{ch}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 block">Subsequent Optimization Modules</span>
                  <div className="space-y-2">
                    {feedback.chaptersToFocusOn?.map((ch: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        <ArrowUpRight size={14} className="text-zinc-400" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={resetQuiz} className="h-11 w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-xl text-sm shadow-md hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <RefreshCw size={14} />
                  <span>Restart Core Module</span>
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
  const isTimeCritical = timerValue < 10;

  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 font-sans antialiased relative p-6 md:p-10 transition-colors duration-300">
      
      <div className="w-full max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Module Header Bar Layout */}
        <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen size={16} />
              </div>
              <h2 className="text-lg font-bold tracking-tight">{current?.chapterName}</h2>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-10">Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-semibold tracking-mono transition-colors duration-200 ${
              isTimeCritical 
                ? "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 animate-pulse" 
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}>
              <Timer size={14} />
              <span>{timerValue}s</span>
            </div>
            <div className="h-9 px-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-xs flex items-center uppercase tracking-wider shadow-sm">
              {current?.level || "Standard"}
            </div>
          </div>
        </div>

        {/* Global Evaluation Progress Indicator */}
        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ease-out rounded-full ${isTimeCritical ? 'bg-red-500' : 'bg-zinc-900 dark:bg-zinc-100'}`} style={{ width: `${progress}%` }} />
        </div>

        {/* Interactive Workspace Engine Layout */}
        <div className="grid grid-cols-1 gap-6">
          <div className={`bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl transition-all duration-200 ${animateQuestion ? "opacity-40 translate-y-1" : "opacity-100 translate-y-0"}`}>
            
            {/* Question Frame */}
            <div className="text-lg md:text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900/60 pb-6 mb-6">
              {current?.question}
            </div>

            {/* Answer Options Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {current?.options.map((opt: string, idx: number) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <button
                    key={idx}
                    disabled={submitting}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-4 md:p-5 rounded-xl text-left border transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-zinc-900 dark:border-zinc-100 shadow-md transform scale-[1.005]"
                        : "bg-white dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-white dark:bg-zinc-900 text-black dark:text-white border-transparent"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-medium leading-tight">{opt}</span>
                    </div>
                    {/* Tiny keyboard shortcut hint displayed on desktop hover */}
                    <span className={`text-[10px] font-mono border px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-40 transition-opacity hidden sm:inline ${
                      isSelected ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Submission Interactive Frame with Hotkey Indicator */}
            <div className="flex items-center justify-end gap-3">
              {selectedOptionIndex !== null && (
                <span className="text-[11px] text-zinc-400 font-medium hidden sm:flex items-center gap-1">
                  Press <span className="bg-zinc-100 dark:bg-zinc-900 border px-1.5 py-0.5 rounded font-mono inline-flex items-center gap-0.5">Enter <CornerDownLeft size={10} /></span> to submit
                </span>
              )}
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null || submitting}
                className="h-11 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-20 disabled:pointer-events-none flex items-center gap-2 group hover:opacity-90 cursor-pointer"
              >
                <span>Submit Answer</span>
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}