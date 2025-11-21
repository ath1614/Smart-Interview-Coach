import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Interview Coach</Text>
      <Text style={styles.subtitle}>Welcome Atharv 👋</Text>
      <Text style={styles.text}>Practice interviews with AI-powered feedback!</Text>
      <Text style={styles.description}>
        • Record your responses to common interview questions{"\n"}
        • Get instant AI feedback on your performance{"\n"}
        • Track your progress over time{"\n"}
        • Improve your confidence and communication skills
      </Text>

      <CustomButton 
        title="Start Practice Session" 
        onPress={() => navigation.navigate('Practice')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#222' },
  subtitle: { fontSize: 18, color: 'gray', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333' },
  description: { 
    fontSize: 14, 
    textAlign: 'left', 
    marginBottom: 30, 
    color: '#666',
    lineHeight: 22,
    paddingHorizontal: 10
  }
});
