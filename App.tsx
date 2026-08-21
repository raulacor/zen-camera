import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';


export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isReady, setReady] = useState(false)

  async function capture() {
    const photo = await cameraRef.current?.takePictureAsync()
    if (!photo) return;
    setPhotoUri(photo.uri)
  }


  if (!permission) return null  // still loading, render nothing
  if (!permission.granted) return (
  <View style={ styles.centered }>
    <Text>Zen Camera needs access to your camera.</Text>
    <Button title="Allow camera" onPress={requestPermission} />
  </View>
);

  return (
    <View style={ styles.container }>
      { photoUri && <Text style={ styles.readout }>{photoUri}</Text> }

      <CameraView 
        style={ styles.camera } 
        facing="back" 
        ref={cameraRef} 
        onCameraReady={() => setReady(true)}
      />
        <Pressable 
          style={ styles.shutter } 
          onPress={capture} 
          disabled={!isReady}
        />  
    </View>
  );
}



/* Stylesheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex:1
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  shutter: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: '#00000090',
    borderWidth: 5
  },
  readout: {
    position: 'absolute',
    top: 60,
    color: '#fff',
    zIndex: 9999
  }
});
