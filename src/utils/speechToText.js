export class SpeechToText {
  constructor() {
    this.isListening = false;
    this.transcript = '';
    this.onResult = null;
    this.onError = null;
    this.timer = null;
  }

  async startListening(onResult, onError) {
    try {
      this.onResult = onResult;
      this.onError = onError;
      this.transcript = '';
      this.isListening = true;
      
      // Simulate speech recognition with a timer
      this.timer = setTimeout(() => {
        const mockTranscript = 'Speech recognition is simulated. Your actual speech would be transcribed here when using a real device with proper speech recognition setup.';
        this.transcript = mockTranscript;
        if (this.onResult) {
          this.onResult(mockTranscript);
        }
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      if (onError) onError(error);
      return false;
    }
  }

  async stopListening() {
    try {
      this.isListening = false;
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