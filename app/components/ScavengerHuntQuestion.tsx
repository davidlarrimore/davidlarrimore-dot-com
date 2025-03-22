"use client";

import { ScavengerHuntQuestionType } from "@/lib/scavenger-hunt-questions";

interface ScavengerHuntQuestionProps {
  question: ScavengerHuntQuestionType;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  isAnswerCorrect: boolean | null;
  showFeedback: boolean;
  onNext: () => void;
  onReset: () => void;
}

export default function ScavengerHuntQuestion({
  question,
  userAnswer,
  onAnswerChange,
  onSubmit,
  isAnswerCorrect,
  showFeedback,
  onNext,
  onReset
}: ScavengerHuntQuestionProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {question.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {question.description}
        </p>
        
        {question.hint && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <span className="font-bold">Hint:</span> {question.hint}
            </p>
          </div>
        )}
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            Task: {question.task}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Your Answer:
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={showFeedback}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your answer here"
        />
        
        <div className="mt-4 flex justify-between">
          {!showFeedback ? (
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition"
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              Next Question
            </button>
          )}
        </div>
      </form>
      
      {showFeedback && (
        <div className={`p-4 rounded-lg mt-4 ${
          isAnswerCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
            : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
        }`}>
          <p className={`font-medium ${
            isAnswerCorrect 
              ? 'text-green-800 dark:text-green-200' 
              : 'text-red-800 dark:text-red-200'
          }`}>
            {isAnswerCorrect 
              ? '✓ Correct! ' + question.successFeedback
              : '✗ Incorrect. ' + question.failureFeedback
            }
          </p>
          
          {!isAnswerCorrect && (
            <div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                Try again with a different approach, or move on to the next question.
              </p>
              <button
                onClick={onReset}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition mr-3"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}