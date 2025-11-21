import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Interview Coach</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What we do</Text>
          <Text style={styles.text}>
            We help you practice job interviews with real-time feedback. 
            Record your answers, get instant analysis, and improve your skills.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          <Text style={styles.bullet}>• Choose from common interview questions</Text>
          <Text style={styles.bullet}>• Record your response using voice</Text>
          <Text style={styles.bullet}>• Get detailed feedback on your performance</Text>
          <Text style={styles.bullet}>• Track your progress over time</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.bullet}>• Voice recording and playback</Text>
          <Text style={styles.bullet}>• Speech analysis and scoring</Text>
          <Text style={styles.bullet}>• Progress tracking</Text>
          <Text style={styles.bullet}>• Works offline</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0</Text>
          <Text style={styles.credit}>Made for better interviews</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 4,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  credit: {
    fontSize: 14,
    color: '#666',
  },
});