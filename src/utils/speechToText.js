import { Platform } from 'react-native';

export class SpeechToText {
  constructor() {
    this.isListening = false;
    this.transcript = '';
    this.onResult = null;
    this.onError = null;
    this.recognition = null;
    this.timer = null;
    this.mockResponses = [
      "Well, I have over three years of experience in software development, particularly in React Native and JavaScript. I've successfully led two major projects that improved user engagement by 40%. I'm passionate about creating user-friendly applications and I believe my technical skills combined with my problem-solving abilities make me a strong candidate for this position.",
      "I want this job because it aligns perfectly with my career goals and interests. Your company's innovative approach to mobile development really excites me. I've been following your recent projects and I'm impressed by the impact you're making in the industry. I believe I can contribute significantly to your team's success.",
      "My greatest strength is my ability to learn quickly and adapt to new technologies. For example, when our team needed to implement a new authentication system, I took the initiative to research and master the technology within a week. I also have strong communication skills which help me collaborate effectively with cross-functional teams.",
      "I'd say my biggest weakness used to be perfectionism, which sometimes slowed down my delivery. However, I've learned to balance quality with efficiency by setting realistic deadlines and focusing on iterative improvements. I now use agile methodologies to ensure I deliver value consistently while maintaining high standards.",
      "In five years, I see myself in a senior technical role where I can mentor junior developers and contribute to architectural decisions. I want to continue growing my expertise in mobile development while also expanding into areas like machine learning and AI integration in mobile apps."
    ];
  }

  async startListening(onResult, onError, currentQuestion = '') {
    try {
      this.onResult = onResult;
      this.onError = onError;
      this.transcript = '';
      this.isListening = true;
      
      // Use real Web Speech API on web, mock on mobile
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
        return this.startWebSpeechRecognition();
      } else {
        return this.startMockRecognition(currentQuestion);
      }
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      if (onError) onError(error);
      return false;
    }
  }

  startWebSpeechRecognition() {
    try {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          this.transcript = finalTranscript;
          if (this.onResult) {
            this.onResult(finalTranscript);
          }
        }
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (this.onError) {
          this.onError(event.error);
        }
      };
      
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Web Speech API error:', error);
      return false;
    }
  }

  startMockRecognition(currentQuestion) {
    this.timer = setTimeout(() => {
      const mockTranscript = this.generateMockResponse(currentQuestion);
      this.transcript = mockTranscript;
      if (this.onResult) {
        this.onResult(mockTranscript);
      }
    }, 3000);
    return true;
  }

  generateMockResponse(question) {
    // Select response based on question content
    if (question.toLowerCase().includes('yourself')) {
      return this.mockResponses[0];
    } else if (question.toLowerCase().includes('want this job') || question.toLowerCase().includes('why')) {
      return this.mockResponses[1];
    } else if (question.toLowerCase().includes('strength')) {
      return this.mockResponses[2];
    } else if (question.toLowerCase().includes('weakness')) {
      return this.mockResponses[3];
    } else if (question.toLowerCase().includes('5 years') || question.toLowerCase().includes('five years')) {
      return this.mockResponses[4];
    } else {
      // Random response for other questions
      return this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
    }
  }

  async stopListening() {
    try {
      this.isListening = false;
      
      if (this.recognition) {
        this.recognition.stop();
        this.recognition = null;
      }
      
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      
      return this.transcript;
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
      return this.transcript || null;
    }
  }

  async destroy() {
    try {
      if (this.recognition) {
        this.recognition.stop();
        this.recognition = null;
      }
      
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      
      this.isListening = false;
    } catch (error) {
      console.error('Failed to destroy speech recognition:', error);
    }
  }
}