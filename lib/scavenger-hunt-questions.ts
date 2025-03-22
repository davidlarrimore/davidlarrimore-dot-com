// lib/scavenger-hunt-questions.ts

// Define the question type
export interface ScavengerHuntQuestionType {
    id: string;
    title: string;
    description: string;
    task: string;
    hint?: string;
    aiContext: string;
    correctAnswers: string[];
    successFeedback: string;
    failureFeedback: string;
  }
  
  // Define the questions
  export const questions: ScavengerHuntQuestionType[] = [
    {
      id: "q1",
      title: "The Hidden Acrostic",
      description: "In this challenge, you need to find a hidden message encoded in an AI-generated text.",
      task: "Ask the AI to write a short poem about technology where the first letter of each line spells out a famous scientist's last name. Then identify the scientist.",
      hint: "Make sure to specify the exact format - a poem where the first letter of each line forms an acrostic. Be specific about what you want.",
      aiContext: "Generate a poem with an acrostic hidden in the first letters of each line. The player needs to identify the scientist's name hidden in the acrostic.",
      correctAnswers: ["turing", "alan turing"],
      successFeedback: "Great job! You successfully extracted the acrostic TURING, revealing Alan Turing, the pioneering computer scientist.",
      failureFeedback: "The correct answer is 'Turing' (Alan Turing). Try asking the AI to create an acrostic poem where the first letters spell out a scientist's name."
    },
    {
      id: "q2",
      title: "The Cipher Challenge",
      description: "In this challenge, you need to get the AI to help you decode a secret message.",
      task: "Ask the AI to encode 'The AI Scavenger Hunt is fun' using a Caesar cipher with a shift of 3, then decode it back. What is the encoded message?",
      hint: "You need to understand both encoding and decoding with the Caesar cipher. Ask the AI to show how it works step by step.",
      aiContext: "Help the player understand Caesar ciphers, demonstrating how to encode and decode messages with a specific shift value. They need to identify the encoded version of a specific phrase.",
      correctAnswers: ["wkh dl vfdyhqjhu kxqw lv ixq"],
      successFeedback: "Excellent! You've correctly identified the encoded message using the Caesar cipher with a shift of 3.",
      failureFeedback: "The correct encoded message is 'wkh dl vfdyhqjhu kxqw lv ixq'. Try asking the AI to encode 'The AI Scavenger Hunt is fun' using a Caesar cipher with a shift of 3."
    },
    {
      id: "q3",
      title: "The Pattern Predictor",
      description: "In this challenge, you'll need to identify a mathematical pattern and predict the next number.",
      task: "Get the AI to explain the mathematical sequence: 1, 3, 6, 10, 15, 21, 28, ... What is the 10th number in this sequence?",
      hint: "Ask the AI to explain the pattern and how each number is generated from the previous ones. Then ask for the 10th number specifically.",
      aiContext: "This is a triangular number sequence where each number is the sum of consecutive integers. Help the player understand the pattern and find specific values in the sequence.",
      correctAnswers: ["55"],
      successFeedback: "Correct! The 10th triangular number is 55. You successfully identified the pattern and used the AI to find the answer.",
      failureFeedback: "The correct answer is '55'. This is the 10th triangular number. Try asking the AI to explain the pattern and calculate the 10th number in the sequence."
    }
  ];