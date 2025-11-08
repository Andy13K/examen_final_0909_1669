import React from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PhotoModal = ({ visible, photo, onClose }) => {
  if (!photo) return null;

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={{ uri: photo.download_url }}
            style={styles.fullImage}
            resizeMode="contain"
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Detalles de la Foto</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>👤 Autor:</Text>
              <Text style={styles.value}>{photo.author}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>🆔 ID:</Text>
              <Text style={styles.value}>{photo.id}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>📐 Dimensiones:</Text>
              <Text style={styles.value}>{photo.width} × {photo.height}px</Text>
            </View>
            
            {photo.url && (
              <TouchableOpacity 
                style={styles.linkButton}
                onPress={() => openUrl(photo.url)}
              >
                <Text style={styles.linkText}>🔗 Ver en Unsplash</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  fullImage: {
    width: width,
    height: height * 0.5,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 20,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
    width: 140,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  linkButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhotoModal;
