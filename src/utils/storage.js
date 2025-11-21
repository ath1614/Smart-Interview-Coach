import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving data: ', error);
  }
};

export const loadData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error loading data: ', error);
  }
};

export const saveSession = async (sessionData) => {
  try {
    const sessions = await loadData('sessions') || [];
    const newSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...sessionData
    };
    sessions.push(newSession);
    await saveData('sessions', sessions);
    return newSession;
  } catch (error) {
    console.log('Error saving session: ', error);
  }
};

export const getSessionStats = async () => {
  try {
    const sessions = await loadData('sessions') || [];
    const totalSessions = sessions.length;
    const avgScore = sessions.length > 0 
      ? Math.round(sessions.reduce((sum, s) => sum + (s.score || 0), 0) / sessions.length)
      : 0;
    const recentSessions = sessions.slice(-5).reverse();
    
    return { totalSessions, avgScore, recentSessions };
  } catch (error) {
    console.log('Error getting session stats: ', error);
    return { totalSessions: 0, avgScore: 0, recentSessions: [] };
  }
};
