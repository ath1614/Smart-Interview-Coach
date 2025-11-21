import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { getSessionStats } from '../utils/storage';

export default function ProfileScreen() {
  const [stats, setStats] = useState({ totalSessions: 0, avgScore: 0, recentSessions: [] });

  useEffect(() => {
    const fetchStats = async () => {
      const sessionStats = await getSessionStats();
      setStats(sessionStats);
    };
    fetchStats();
    
    // Refresh stats when screen is focused
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Progress</Text>
      
      <Card style={styles.statsCard}>
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalSessions}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: getScoreColor(stats.avgScore) }]}>
                {stats.avgScore}
              </Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {stats.recentSessions.length > 0 && (
        <Card style={styles.historyCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            {stats.recentSessions.map((session, index) => (
              <View key={session.id} style={styles.sessionItem}>
                <View style={styles.sessionHeader}>
                  <Text style={styles.sessionDate}>{formatDate(session.date)}</Text>
                  <Text style={[styles.sessionScore, { color: getScoreColor(session.score) }]}>
                    {session.score}/100
                  </Text>
                </View>
                <Text style={styles.sessionQuestion} numberOfLines={2}>
                  {session.question}
                </Text>
                <Text style={styles.sessionMetrics}>
                  Words: {session.metrics?.wordCount || 0} | 
                  Fillers: {session.metrics?.fillerCount || 0} | 
                  Confidence: {session.metrics?.confidence || 0}%
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {stats.totalSessions === 0 && (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text style={styles.emptyText}>No practice sessions yet!</Text>
            <Text style={styles.emptySubtext}>Start practicing to see your progress here.</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#222' },
  statsCard: { marginBottom: 16, elevation: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 32, fontWeight: 'bold', color: '#007AFF' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4 },
  historyCard: { marginBottom: 16, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  sessionItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  sessionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sessionDate: { fontSize: 12, color: '#666' },
  sessionScore: { fontSize: 16, fontWeight: 'bold' },
  sessionQuestion: { fontSize: 14, color: '#333', marginVertical: 4 },
  sessionMetrics: { fontSize: 12, color: '#888' },
  emptyCard: { marginTop: 40, elevation: 2 },
  emptyText: { fontSize: 18, textAlign: 'center', color: '#666', marginBottom: 8 },
  emptySubtext: { fontSize: 14, textAlign: 'center', color: '#999' }
});
