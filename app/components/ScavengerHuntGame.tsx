"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AIChat from "./ScavengerHuntChat";
import ScavengerHuntQuestion from "./ScavengerHuntQuestion";
import { questions } from "@/lib/scavenger-hunt-questions";
import Link from "next/link";

// Define interface for props (all optional)
interface ScavengerHuntGameProps {
  // Add any props you want to make configurable
  initialQuestionIndex?: number;
  initialScore?: number;
}

export default function ScavengerHuntGame({
  initialQuestionIndex = 0,
  initialScore = 0
}: ScavengerHuntGameProps = {}) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('ai-scavenger-hunt-state');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setCurrentQuestionIndex(state.currentQuestionIndex || 0);
        setUserAnswers(state.userAnswers || Array(questions.length).fill(""));
        setScore(state.score || 0);
        setGameCompleted(state.gameCompleted || false);
        
        // Only initialize messages when appropriate (not completed/new session)
        if (!state.gameCompleted && state.chatMessages && state.chatMessages.length > 0) {
          setChatMessages(state.chatMessages);
        }
      } catch (error) {
        console.error("Error loading saved game state:", error);
      }
    }
  }, []);
  
  // Save game state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        currentQuestionIndex,
        userAnswers,
        score,
        gameCompleted,
        chatMessages
      };
      localStorage.setItem('ai-scavenger-hunt-state', JSON.stringify(stateToSave));
    }
  }, [currentQuestionIndex, userAnswers, score, gameCompleted, chatMessages]);
  
  const onChatMessage = (message: {role: string, content: string}) => {
    setChatMessages(prevMessages => [...prevMessages, message]);
  };
  
  const checkAnswer = () => {
    // Get user's answer for the current question
    const userAnswer = userAnswers[currentQuestionIndex]?.trim().toLowerCase();
    
    // Prepare and check against possible correct answers (which are all lowercase)
    const isCorrect = currentQuestion.correctAnswers.some(answer => 
      userAnswer === answer.toLowerCase()
    );
    
    // Update feedback state
    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    // Update score if correct
    if (isCorrect && isAnswerCorrect !== true) { // Only add to score once
      setScore(prevScore => prevScore + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setShowFeedback(false);
    setIsAnswerCorrect(null);
    
    // If there are more questions, go to the next one
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Reset chat messages for the new question
      setChatMessages([]);
    } else {
      // Game completed
      setGameCompleted(true);
    }
  };
  
  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };
  
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(""));
    setIsAnswerCorrect(null);
    setShowFeedback(false);
    setScore(0);
    setGameCompleted(false);
    setChatMessages([]);
    
    // Clear local storage
    localStorage.removeItem('ai-scavenger-hunt-state');
  };
  
  const resetCurrentQuestion = () => {
    // Reset only the current question and chat
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = "";
    setUserAnswers(newAnswers);
    setIsAnswerCorrect(null);
    setShowFeedback(false);
    setChatMessages([]);
    
    // Update local storage
    const stateToSave = {
      currentQuestionIndex,
      userAnswers: newAnswers,
      score,
      gameCompleted,
      chatMessages: []
    };
    localStorage.setItem('ai-scavenger-hunt-state', JSON.stringify(stateToSave));
  };
  
  // If game is completed, show results screen
  if (gameCompleted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Scavenger Hunt Completed!
          </h2>
          
          <div className="p-6 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Your Score: {score} out of {questions.length}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {score === questions.length 
                ? "Perfect score! You've mastered the art of AI prompting!" 
                : score > questions.length / 2 
                  ? "Great job! You're getting the hang of working with AI!"
                  : "Keep practicing your prompt engineering skills!"}
            </p>
          </div>
          
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Play Again
          </button>
          
          <button
            onClick={() => router.push('/projects')}
            className="ml-4 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Question Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Challenge {currentQuestionIndex + 1}/{questions.length}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={resetCurrentQuestion}
                className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                title="Reset current question and clear chat"
              >
                Reset Question
              </button>
              <button 
                onClick={resetGame}
                className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800/20 transition"
                title="Restart the entire game"
              >
                Restart Game
              </button>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
                Score: {score}/{questions.length}
              </span>
            </div>
          </div>
          
          <ScavengerHuntQuestion
            question={currentQuestion}
            userAnswer={userAnswers[currentQuestionIndex] || ""}
            onAnswerChange={handleAnswerChange}
            onSubmit={checkAnswer}
            isAnswerCorrect={isAnswerCorrect}
            showFeedback={showFeedback}
            onNext={handleNextQuestion}
            onReset={resetCurrentQuestion}
          />
        </div>
      </div>
      
      {/* AI Chat Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <AIChat 
          messages={chatMessages}
          onNewMessage={onChatMessage}
          questionContext={currentQuestion.aiContext}
        />
      </div>
    </div>
  );
}