import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Interview Coach</Text>
      <Text style={styles.subtitle}>Welcome Atharv 👋</Text>
      <Text style={styles.text}>Practice interviews and track your growth!</Text>

      <CustomButton 
        title="Start Practice" 
        onPress={() => navigation.navigate('Practice')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, color: 'gray', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center', marginBottom: 20 }
});
