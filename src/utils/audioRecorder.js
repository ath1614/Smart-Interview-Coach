import { Audio } from 'expo-av';

export class AudioRecorder {
  constructor() {
    this.recording = null;
    this.sound = null;
  }

  async startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        throw new Error('Audio permission not granted');
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      this.recording = recording;
      return true;
    } catch (error) {
      console.error('Failed to start recording', error);
      return false;
    }
  }

  async stopRecording() {
    try {
      if (!this.recording) return null;
      
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;
      return uri;
    } catch (error) {
      console.error('Failed to stop recording', error);
      return null;
    }
  }

  async playRecording(uri) {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      this.sound = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }
}