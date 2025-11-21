import { AudioRecorder as ExpoAudioRecorder, AudioPlayer } from 'expo-audio';

export class AudioRecorder {
  constructor() {
    this.recorder = null;
    this.player = null;
  }

  async startRecording() {
    try {
      const permission = await ExpoAudioRecorder.requestPermissionsAsync();
      if (!permission.granted) {
        throw new Error('Audio permission not granted');
      }

      this.recorder = new ExpoAudioRecorder({
        android: {
          extension: '.m4a',
          outputFormat: 'mpeg4',
          audioEncoder: 'aac',
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: 'mpeg4aac',
          audioQuality: 'max',
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      await this.recorder.prepareAsync();
      await this.recorder.startAsync();
      return true;
    } catch (error) {
      console.error('Failed to start recording', error);
      return false;
    }
  }

  async stopRecording() {
    try {
      if (!this.recorder) return null;
      
      await this.recorder.stopAsync();
      const uri = this.recorder.uri;
      this.recorder = null;
      return uri;
    } catch (error) {
      console.error('Failed to stop recording', error);
      return null;
    }
  }

  async playRecording(uri) {
    try {
      if (this.player) {
        await this.player.unloadAsync();
      }
      this.player = new AudioPlayer(uri);
      await this.player.play();
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }
}