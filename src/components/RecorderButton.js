import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RecorderButton({ isRecording, onPress }) {
  return (
    <TouchableOpacity 
      style={[styles.button, isRecording ? styles.stopButton : styles.startButton]} 
      onPress={onPress}
    >
      <Text style={styles.text}>
        {isRecording ? "Stop" : "Record"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  startButton: {
    backgroundColor: '#28a745'
  },
  stopButton: {
    backgroundColor: '#dc3545'
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
