import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  Dimensions,
  Platform,
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
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Navbar Superior */}
      <View style={styles.navbar}>
        <View style={styles.navbarContent}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>👨‍💻 Andy Aquino</Text>
            <Text style={styles.studentId}>0909-22-1669</Text>
          </View>
          <View style={styles.examInfo}>
            <Text style={styles.examTitle}>Examen Final</Text>
            <Text style={styles.examSubject}>Desarrollo Web</Text>
          </View>
        </View>
      </View>

      {/* Header de Galería */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient}>
          <Text style={styles.headerTitle}>📸 Galería de Fotos</Text>
          <Text style={styles.headerSubtitle}>
            Explora {photos.length} fotos increíbles de Picsum
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
  // Navbar Superior
  navbar: {
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 13,
    color: '#667eea',
    fontWeight: '600',
  },
  examInfo: {
    alignItems: 'flex-end',
  },
  examTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  examSubject: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  // Header de Galería
  headerContainer: {
    marginBottom: 8,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
    paddingTop: 8,
  },
});