import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FeedbackBox({ feedback, score, metrics }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Feedback</Text>
        {score && (
          <Text style={[styles.score, { color: getScoreColor(score) }]}>
            {score}/100
          </Text>
        )}
      </View>
      
      {metrics && (
        <View style={styles.metrics}>
          <Text style={styles.metric}>Words: {metrics.wordCount}</Text>
          <Text style={styles.metric}>Fillers: {metrics.fillerCount}</Text>
          <Text style={styles.metric}>Confidence: {metrics.confidence}%</Text>
        </View>
      )}
      
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
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  score: { fontSize: 20, fontWeight: 'bold' },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  metric: { fontSize: 12, color: '#666', fontWeight: '600' },
  body: { fontSize: 14, color: '#333', marginBottom: 4, lineHeight: 20 },
});
