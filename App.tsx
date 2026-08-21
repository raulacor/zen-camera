import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  useEffect(() => {
    requestPermission()
    requestMediaPermission();
  }, []);
  
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isReady, setReady] = useState(false)

  const addPhoto = (newPhoto: string) => {
    setPhotos(prev => [newPhoto, ...prev]);
    
  }
  
  async function capture() {
    const photo = await cameraRef.current?.takePictureAsync()
    if (!photo) return;
    addPhoto(photo.uri)
    await MediaLibrary.saveToLibraryAsync(photo.uri)
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
      { photos.length > 0 && <Text style={ styles.readout }>{photos.length} photos</Text> }
          <Pressable
            style={styles.galleryBtn}
            disabled = {photos.length ===0}
            onPress={() => console.log('open list')} //Will become open gallery
          >
            {photos.length > 0 && (<Image source={{ uri: photos[0] }} style={styles.latestImg} />)}
          </Pressable>
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
    bottom: 80,
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
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  galleryBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom:87,
    left: 20,
    gap: 8,
    zIndex: 99999,
    width: 65,
    height: 65,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  latestImg: {
    width: '100%',
    height: '100%',
  }
});
