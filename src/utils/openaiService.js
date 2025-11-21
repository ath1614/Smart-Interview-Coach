import OpenAI from 'openai';
import Constants from 'expo-constants';

const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.OPENAI_API_KEY || 'your-api-key-here',
  dangerouslyAllowBrowser: true
});

export class OpenAIService {
  async generateFeedback(question, transcript) {
    try {
      const prompt = `As an interview coach, analyze this interview response and provide specific, actionable feedback.

Question: "${question}"
Response: "${transcript}"

Please provide:
1. A score out of 100
2. 3-5 specific feedback points
3. What they did well
4. Areas for improvement

Format your response as JSON:
{
  "score": 85,
  "feedback": [
    "Great use of specific examples with quantifiable results",
    "Consider reducing filler words like 'um' and 'uh'",
    "Strong confidence in delivery"
  ],
  "strengths": ["Specific examples", "Clear structure"],
  "improvements": ["Reduce filler words", "Add more enthusiasm"]
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      });

      const response = completion.choices[0].message.content;
      return JSON.parse(response);
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fallback to rule-based analysis
      return this.fallbackAnalysis(transcript);
    }
  }

  fallbackAnalysis(transcript) {
    const words = transcript.toLowerCase().split(/\s+/);
    const wordCount = words.length;
    const fillerWords = ['um', 'uh', 'like', 'you know'].filter(filler => 
      words.includes(filler)
    ).length;
    
    const score = Math.max(50, 90 - (fillerWords * 5));
    
    return {
      score,
      feedback: [
        `Response length: ${wordCount} words (good detail)`,
        fillerWords > 0 ? `Reduce filler words (found ${fillerWords})` : 'Clear speech with no filler words',
        'Consider adding more specific examples'
      ],
      strengths: ['Detailed response'],
      improvements: ['Add specific examples', 'Practice smoother delivery']
    };
  }
}