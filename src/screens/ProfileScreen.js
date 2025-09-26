import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { loadData, saveData } from '../utils/storage';
import CustomButton from '../components/CustomButton';

export default function ProfileScreen() {
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const stored = await loadData('attempts');
      if (stored !== null) setAttempts(stored);
    };
    fetchData();
  }, []);

  const increaseAttempts = async () => {
    const newCount = attempts + 1;
    setAttempts(newCount);
    await saveData('attempts', newCount);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.text}>Attempts: {attempts}</Text>
          <Text style={styles.text}>Progress: (Chart coming soon 🚀)</Text>
        </Card.Content>
      </Card>

      <CustomButton title="Simulate Attempt" onPress={increaseAttempts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '90%', padding: 20, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 }
});
