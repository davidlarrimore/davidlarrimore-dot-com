"use client";

import { ScavengerHuntQuestionType } from "@/lib/scavenger-hunt-questions";
import Button from "./ds/Button";

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
  onReset,
}: ScavengerHuntQuestionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <div className="mb-6">
        <div style={{ font: "700 17px var(--font-sans)", color: "var(--fg)", marginBottom: 8 }}>{question.title}</div>
        <p style={{ font: "14px/1.6 var(--font-sans)", color: "var(--fg-secondary)", marginBottom: 16 }}>
          {question.description}
        </p>

        {question.hint && (
          <div
            className="mb-4"
            style={{
              padding: 12,
              background: "var(--surface-sunken)",
              borderLeft: "2px solid var(--accent2)",
            }}
          >
            <p style={{ font: "13px/1.5 var(--font-sans)", color: "var(--fg-secondary)" }}>
              <span style={{ font: "700 11px var(--font-mono)", color: "var(--accent2-soft-text)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", marginRight: 6 }}>
                Hint
              </span>
              {question.hint}
            </p>
          </div>
        )}

        <div style={{ padding: 14, background: "var(--surface-sunken)", border: "1px solid var(--border)" }}>
          <p style={{ font: "13px/1.5 var(--font-mono)", color: "var(--accent-soft-text)" }}>Task: {question.task}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <label
          style={{
            display: "block",
            font: "700 11px var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-wide)",
            color: "var(--fg-muted)",
            marginBottom: 8,
          }}
        >
          Your Answer
        </label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={showFeedback}
          className="ds-chat-input w-full"
          placeholder="Type your answer here"
        />

        <div className="mt-4 flex justify-between">
          {!showFeedback ? (
            <Button type="submit" variant="primary">
              Check Answer
            </Button>
          ) : (
            <Button type="button" onClick={onNext} variant="primary">
              Next Question
            </Button>
          )}
        </div>
      </form>

      {showFeedback && (
        <div
          className="mt-4"
          style={{
            padding: 16,
            background: "var(--surface-sunken)",
            borderLeft: `2px solid ${isAnswerCorrect ? "var(--success)" : "#f66"}`,
          }}
        >
          <p style={{ font: "600 14px var(--font-sans)", color: isAnswerCorrect ? "var(--success)" : "#f88" }}>
            {isAnswerCorrect ? "✓ Correct! " + question.successFeedback : "✗ Incorrect. " + question.failureFeedback}
          </p>

          {!isAnswerCorrect && (
            <div>
              <p className="mt-2 mb-3" style={{ font: "13px var(--font-sans)", color: "var(--fg-muted)" }}>
                Try again with a different approach, or move on to the next question.
              </p>
              <Button onClick={onReset} variant="ghost" size="sm">
                Try Again
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
