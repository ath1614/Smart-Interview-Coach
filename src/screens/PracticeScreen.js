import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import RecorderButton from '../components/RecorderButton';

export default function PracticeScreen() {
  const [facing, setFacing] = useState('front'); // default front camera
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleRecordPress = () => {
    setIsRecording(!isRecording);
    // Recording logic will be added in Day 4+
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice Interview</Text>

      <CameraView style={styles.camera} facing={facing} />

      <RecorderButton isRecording={isRecording} onPress={handleRecordPress} />

      <TouchableOpacity style={styles.flipBtn} onPress={toggleCameraFacing}>
        <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
  message: { textAlign: 'center', paddingBottom: 10, color: '#fff' },
  camera: { width: '90%', height: '60%', borderRadius: 15, overflow: 'hidden' },
  permissionBtn: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  flipBtn: {
    marginTop: 15,
    backgroundColor: '#555',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: { fontSize: 16, color: '#fff' },
});
