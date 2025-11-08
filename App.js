import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  Dimensions,
} from 'react-native';
import PhotoCard from './components/PhotoCard';
import PhotoModal from './components/PhotoModal';

const { width } = Dimensions.get('window');

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
      const data = await response.json();
      setPhotos(data);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos();
  };

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Limpiar después de la animación
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient}>
          <Text style={styles.headerTitle}>📸 Galería de Fotos</Text>
          <Text style={styles.headerSubtitle}>
            Explora {photos.length} fotos increíbles
          </Text>
        </View>
      </View>

      {/* Lista de fotos */}
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <PhotoCard
            photo={item}
            onPress={() => handlePhotoPress(item)}
            index={index}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#667eea"
            colors={['#667eea', '#764ba2', '#f093fb']}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      <PhotoModal
        photo={selectedPhoto}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  headerContainer: {
    marginBottom: 8,
  },
  headerGradient: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});