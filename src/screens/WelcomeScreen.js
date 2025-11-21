import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Interview Coach</Text>
        <Text style={styles.subtitle}>Practice makes perfect</Text>
        
        <View style={styles.description}>
          <Text style={styles.text}>
            Get ready for your next job interview with personalized practice sessions and instant feedback.
          </Text>
        </View>

        <View style={styles.buttons}>
          <CustomButton 
            title="Get Started" 
            onPress={() => navigation.navigate('Main')}
            style={styles.primaryButton}
          />
          <CustomButton 
            title="Learn More" 
            onPress={() => navigation.navigate('About')}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 48,
    textAlign: 'center',
  },
  description: {
    marginBottom: 48,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    maxWidth: 280,
  },
  buttons: {
    width: '100%',
    maxWidth: 280,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#333',
  },
});