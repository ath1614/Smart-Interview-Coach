import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { getRandomQuestion } from '../data/questions';
import { AudioRecorder } from '../utils/audioRecorder';
import { SpeechToText } from '../utils/speechToText';
import { FeedbackAnalyzer } from '../utils/feedbackAnalyzer';
import { saveSession } from '../utils/storage';
import FeedbackBox from '../components/FeedbackBox';

export default function PracticeScreen() {
  const [facing, setFacing] = useState('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [recordingUri, setRecordingUri] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const audioRecorder = useRef(new AudioRecorder()).current;
  const speechToText = useRef(new SpeechToText()).current;
  const feedbackAnalyzer = useRef(new FeedbackAnalyzer()).current;

  useEffect(() => {
    return () => {
      speechToText.destroy();
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleRecord = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('');
      setRecordingUri(null);
      
      // Start both audio recording and speech recognition
      const audioSuccess = await audioRecorder.startRecording();
      const speechSuccess = await speechToText.startListening(
        (text) => setTranscript(text),
        (error) => console.error('Speech error:', error),
        currentQuestion
      );
      
      if (!audioSuccess && !speechSuccess) {
        setIsRecording(false);
        setTranscript('Failed to start recording. Please check permissions.');
      }
    } else {
      setIsRecording(false);
      
      // Stop both audio recording and speech recognition
      const uri = await audioRecorder.stopRecording();
      const finalTranscript = await speechToText.stopListening();
      
      if (uri) {
        setRecordingUri(uri);
        const textToAnalyze = finalTranscript || transcript;
        if (textToAnalyze) {
          setTranscript(textToAnalyze);
          setTranscript(prev => prev + '\n\nAnalyzing with AI...');
          
          // Generate AI feedback
          const analysis = await feedbackAnalyzer.analyzeSpeech(textToAnalyze, currentQuestion);
          setFeedback(analysis);
          setTranscript(textToAnalyze); // Remove analyzing message
          
          // Save session data
          await saveSession({
            question: currentQuestion,
            transcript: textToAnalyze,
            score: analysis.score,
            feedback: analysis.feedback,
            metrics: analysis.metrics
          });
        } else {
          setTranscript('Recording completed! No speech detected.');
          setFeedback(null);
        }
      } else {
        setTranscript('Recording failed. Please try again.');
        setFeedback(null);
      }
    }
  };

  const playRecording = async () => {
    if (recordingUri) {
      await audioRecorder.playRecording(recordingUri);
    }
  };

  const getNextQuestion = () => {
    setCurrentQuestion(getRandomQuestion());
    setTranscript('');
    setRecordingUri(null);
    setFeedback(null);
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Practice Screen</Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={getNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      </View>

      {/* Show Camera (real device) or Placeholder (simulator) */}
      {Platform.OS === 'ios' && !process.env.EXPO_DEVICE ? (
        <Image
          source={require('../assets/placeholder.png')}
          style={styles.camera}
          resizeMode="cover"
        />
      ) : (
        <CameraView style={styles.camera} facing={facing} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isRecording ? styles.stopButton : styles.recordButton]}
          onPress={handleRecord}
          disabled={isRecording && transcript.includes('Analyzing')}
        >
          <Text style={styles.text}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recording Status & Playback */}
      {(transcript || recordingUri) && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptTitle}>{recordingUri ? 'Transcript:' : 'Recording Status:'}:</Text>
          {transcript && (
            <ScrollView style={styles.scrollArea}>
              <Text style={styles.transcriptText}>{transcript}</Text>
            </ScrollView>
          )}
          {recordingUri && (
            <TouchableOpacity style={styles.playButton} onPress={playRecording}>
              <Text style={styles.playButtonText}>Play Recording</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* AI Feedback */}
      {feedback && (
        <FeedbackBox 
          feedback={feedback.feedback} 
          score={feedback.score}
          metrics={feedback.metrics}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
    color: '#222',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    borderRadius: 16,
    marginHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  recordButton: {
    backgroundColor: '#FF3B30',
  },
  stopButton: {
    backgroundColor: '#34C759',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  transcriptContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 16,
    maxHeight: 250,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  transcriptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  scrollArea: {
    maxHeight: 200,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  questionContainer: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 12,
  },
  nextButton: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
