import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TranscriptBox({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcription</Text>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  body: { fontSize: 16, color: '#333' },
});
