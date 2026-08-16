"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AIChat from "./ScavengerHuntChat";
import ScavengerHuntQuestion from "./ScavengerHuntQuestion";
import { questions } from "@/lib/scavenger-hunt-questions";
import Card from "./ds/Card";
import Eyebrow from "./ds/Eyebrow";
import Button from "./ds/Button";
import StatChart from "./ds/StatChart";
import EmbedFrame from "./ds/EmbedFrame";

interface ScavengerHuntGameProps {
  initialQuestionIndex?: number;
  initialScore?: number;
}

export default function ScavengerHuntGame({
  initialQuestionIndex = 0,
  initialScore = 0,
}: ScavengerHuntGameProps = {}) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const savedState = localStorage.getItem("ai-scavenger-hunt-state");
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        setCurrentQuestionIndex(state.currentQuestionIndex || 0);
        setUserAnswers(state.userAnswers || Array(questions.length).fill(""));
        setScore(state.score || 0);
        setGameCompleted(state.gameCompleted || false);

        if (!state.gameCompleted && state.chatMessages && state.chatMessages.length > 0) {
          setChatMessages(state.chatMessages);
        }
      } catch (error) {
        console.error("Error loading saved game state:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stateToSave = { currentQuestionIndex, userAnswers, score, gameCompleted, chatMessages };
      localStorage.setItem("ai-scavenger-hunt-state", JSON.stringify(stateToSave));
    }
  }, [currentQuestionIndex, userAnswers, score, gameCompleted, chatMessages]);

  const onChatMessage = (message: { role: string; content: string }) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const checkAnswer = () => {
    const userAnswer = userAnswers[currentQuestionIndex]?.trim().toLowerCase();
    const isCorrect = currentQuestion.correctAnswers.some((answer) => userAnswer === answer.toLowerCase());

    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect && isAnswerCorrect !== true) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setIsAnswerCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setChatMessages([]);
    } else {
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
    localStorage.removeItem("ai-scavenger-hunt-state");
  };

  const resetCurrentQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = "";
    setUserAnswers(newAnswers);
    setIsAnswerCorrect(null);
    setShowFeedback(false);
    setChatMessages([]);

    const stateToSave = {
      currentQuestionIndex,
      userAnswers: newAnswers,
      score,
      gameCompleted,
      chatMessages: [],
    };
    localStorage.setItem("ai-scavenger-hunt-state", JSON.stringify(stateToSave));
  };

  if (gameCompleted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className="text-center" style={{ padding: 48 }}>
        <Eyebrow>// run complete</Eyebrow>
        <div style={{ font: "var(--text-h1)", color: "var(--fg)", marginBottom: 32 }}>Scavenger Hunt Completed!</div>

        <div className="flex justify-center mb-8">
          <StatChart data={[{ label: "Score", value: pct }]} />
        </div>

        <p style={{ font: "700 20px var(--font-mono)", color: "var(--accent-hover)", marginBottom: 8 }}>
          {score} / {questions.length}
        </p>
        <p style={{ font: "14px var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 32 }}>
          {score === questions.length
            ? "Perfect score! You've mastered the art of AI prompting!"
            : score > questions.length / 2
              ? "Great job! You're getting the hang of working with AI!"
              : "Keep practicing your prompt engineering skills!"}
        </p>

        <div className="flex justify-center gap-3">
          <Button onClick={resetGame} variant="primary">
            Play Again
          </Button>
          <Button onClick={() => router.push("/projects")} variant="secondary">
            Back to Projects
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <EmbedFrame url="scavenger-hunt.davidlarrimore.com">
      <div className="grid md:grid-cols-2 gap-6 p-6" style={{ background: "var(--bg)" }}>
        <div>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
            <Eyebrow color="var(--fg-muted)">
              // challenge {currentQuestionIndex + 1}/{questions.length}
            </Eyebrow>
            <div className="flex items-center gap-2">
              <button
                onClick={resetCurrentQuestion}
                className="ds-btn ds-btn-ghost ds-btn-sm"
                title="Reset current question and clear chat"
              >
                Reset Question
              </button>
              <button onClick={resetGame} className="ds-btn ds-btn-ghost ds-btn-sm" title="Restart the entire game">
                Restart
              </button>
              <span className="ds-tag ds-tag-blue">
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

        <div style={{ border: "1px solid var(--border)" }}>
          <AIChat messages={chatMessages} onNewMessage={onChatMessage} questionContext={currentQuestion.aiContext} />
        </div>
      </div>
    </EmbedFrame>
  );
}
