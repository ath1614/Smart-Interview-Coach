export const interviewQuestions = [
  "Tell me about yourself.",
  "Why do you want this job?",
  "What are your greatest strengths?",
  "What is your biggest weakness?",
  "Where do you see yourself in 5 years?",
  "Why are you leaving your current job?",
  "Describe a challenging situation you faced at work.",
  "What motivates you?",
  "How do you handle stress and pressure?",
  "Do you have any questions for us?"
];

export const getRandomQuestion = () => {
  return interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
};