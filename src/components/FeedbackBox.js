import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FeedbackBox({ feedback }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Feedback</Text>
      {feedback.map((item, index) => (
        <Text key={index} style={styles.body}>• {item}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#e8f0ff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#007AFF' },
  body: { fontSize: 16, color: '#333', marginBottom: 4 },
});
