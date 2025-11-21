import Voice from '@react-native-voice/voice';

export class SpeechToText {
  constructor() {
    this.isListening = false;
    this.transcript = '';
    this.onResult = null;
    this.onError = null;
    
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechError = this.onSpeechError;
  }

  onSpeechStart = () => {
    this.isListening = true;
  };

  onSpeechEnd = () => {
    this.isListening = false;
  };

  onSpeechResults = (event) => {
    const transcript = event.value[0];
    this.transcript = transcript;
    if (this.onResult) {
      this.onResult(transcript);
    }
  };

  onSpeechError = (error) => {
    console.error('Speech recognition error:', error);
    this.isListening = false;
    if (this.onError) {
      this.onError(error);
    }
  };

  async startListening(onResult, onError) {
    try {
      this.onResult = onResult;
      this.onError = onError;
      this.transcript = '';
      await Voice.start('en-US');
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      return false;
    }
  }

  async stopListening() {
    try {
      await Voice.stop();
      return this.transcript;
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
      return null;
    }
  }

  async destroy() {
    try {
      await Voice.destroy();
    } catch (error) {
      console.error('Failed to destroy speech recognition:', error);
    }
  }
}