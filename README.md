# Smart Interview Coach

AI-powered interview practice app with real-time feedback.

## Features

- 🎙️ Real audio recording
- 🗣️ Speech-to-text (Web Speech API on web, mock on mobile)
- 🤖 AI-powered feedback using OpenAI GPT-3.5
- 📊 Progress tracking and analytics
- 📱 Cross-platform (iOS, Android, Web)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your OpenAI API key to `app.json`:
   ```json
   "extra": {
     "OPENAI_API_KEY": "your-actual-openai-api-key-here"
   }
   ```
4. Run the app: `expo start`

## Getting OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up/Login
3. Navigate to API Keys
4. Create new secret key
5. Copy and paste into `app.json`

## Usage

1. **Home**: Welcome screen with app overview
2. **Practice**: Record responses to interview questions
3. **Profile**: View your progress and session history

The app works offline with mock responses, but requires internet for AI feedback.