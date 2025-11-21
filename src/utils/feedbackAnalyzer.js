import { OpenAIService } from './openaiService';

export class FeedbackAnalyzer {
  constructor() {
    this.fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally'];
    this.positiveWords = ['achieved', 'successful', 'improved', 'led', 'managed', 'created', 'developed'];
    this.weakWords = ['maybe', 'probably', 'i think', 'i guess', 'sort of', 'kind of'];
    this.openaiService = new OpenAIService();
  }

  async analyzeSpeech(transcript, question = '') {
    // Try OpenAI first, fallback to rule-based
    if (question && transcript.length > 50) {
      try {
        const aiAnalysis = await this.openaiService.generateFeedback(question, transcript);
        return this.formatAIResponse(aiAnalysis, transcript);
      } catch (error) {
        console.log('Using fallback analysis:', error);
      }
    }
    
    return this.ruleBasedAnalysis(transcript);
  }

  formatAIResponse(aiResponse, transcript) {
    const words = transcript.split(/\s+/);
    const fillerCount = this.countFillerWords(words);
    
    return {
      score: aiResponse.score || 75,
      feedback: aiResponse.feedback || ['Good response overall'],
      metrics: {
        fillerCount,
        wordCount: words.length,
        pace: Math.round(words.length / 1 * 60), // words per minute estimate
        confidence: aiResponse.score || 75
      }
    };
  }

  ruleBasedAnalysis(transcript) {
    if (!transcript || transcript.length < 10) {
      return {
        score: 0,
        feedback: ['Recording too short for analysis. Please speak for at least 30 seconds.'],
        metrics: { fillerCount: 0, wordCount: 0, pace: 0, confidence: 0 }
      };
    }

    const words = transcript.toLowerCase().split(/\s+/);
    const wordCount = words.length;
    const fillerCount = this.countFillerWords(words);
    const positiveCount = this.countPositiveWords(words);
    const weakCount = this.countWeakWords(words);
    
    const pace = this.calculatePace(wordCount);
    const confidence = this.calculateConfidence(positiveCount, weakCount, wordCount);
    const clarity = this.calculateClarity(fillerCount, wordCount);
    
    const score = Math.round((pace + confidence + clarity) / 3);
    const feedback = this.generateFeedback(fillerCount, pace, confidence, clarity, wordCount);

    return {
      score,
      feedback,
      metrics: { fillerCount, wordCount, pace: Math.round(pace), confidence: Math.round(confidence) }
    };
  }

  countFillerWords(words) {
    return words.filter(word => this.fillerWords.includes(word)).length;
  }

  countPositiveWords(words) {
    return words.filter(word => this.positiveWords.some(pos => word.includes(pos))).length;
  }

  countWeakWords(words) {
    return words.filter(word => this.weakWords.some(weak => word.includes(weak))).length;
  }

  calculatePace(wordCount) {
    const idealWordsPerMinute = 150;
    const estimatedMinutes = 1; // Assuming 1 minute recording
    const currentPace = wordCount / estimatedMinutes;
    
    if (currentPace < 100) return 60; // Too slow
    if (currentPace > 200) return 70; // Too fast
    return 90; // Good pace
  }

  calculateConfidence(positiveCount, weakCount, wordCount) {
    const positiveRatio = positiveCount / wordCount;
    const weakRatio = weakCount / wordCount;
    
    let score = 75;
    score += positiveRatio * 100;
    score -= weakRatio * 50;
    
    return Math.max(0, Math.min(100, score));
  }

  calculateClarity(fillerCount, wordCount) {
    const fillerRatio = fillerCount / wordCount;
    if (fillerRatio > 0.1) return 50; // Too many fillers
    if (fillerRatio > 0.05) return 70; // Some fillers
    return 90; // Clear speech
  }

  generateFeedback(fillerCount, pace, confidence, clarity, wordCount) {
    const feedback = [];
    
    if (fillerCount > wordCount * 0.1) {
      feedback.push(`Reduce filler words (found ${fillerCount}). Practice pausing instead of saying "um" or "uh".`);
    } else if (fillerCount === 0) {
      feedback.push('Excellent! No filler words detected. Very clear communication.');
    }

    if (pace < 70) {
      feedback.push('Speak a bit faster to maintain engagement. Aim for 150 words per minute.');
    } else if (pace > 90) {
      feedback.push('Great speaking pace! You maintained good rhythm throughout.');
    }

    if (confidence < 70) {
      feedback.push('Use more confident language. Replace "I think" with "I believe" or direct statements.');
    } else {
      feedback.push('Good confidence in your responses. Keep using strong, positive language.');
    }

    if (clarity < 70) {
      feedback.push('Work on speech clarity. Practice speaking more slowly and distinctly.');
    }

    if (wordCount < 50) {
      feedback.push('Provide more detailed answers. Aim for 1-2 minutes per response.');
    }

    if (feedback.length === 0) {
      feedback.push('Excellent performance! Your speech was clear, confident, and well-paced.');
    }

    return feedback;
  }
}