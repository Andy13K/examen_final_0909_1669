import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import PhotoCard from './components/PhotoCard';
import PhotoModal from './components/PhotoModal';

const { width } = Dimensions.get('window');

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-50);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPhotos();
  };

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.headerGradient}>
        <Text style={styles.headerTitle}>📸 Galería de Fotos</Text>
        <Text style={styles.headerSubtitle}>
          Explora {photos.length} fotos increíbles
        </Text>
      </View>
    </Animated.View>
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <Animated.View
            style={[
              styles.skeletonShimmer,
              {
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0.7],
                }),
              },
            ]}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {renderHeader()}

      {loading && renderSkeleton()}

      {!loading && (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={photos}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <PhotoCard
                photo={item}
                onPress={() => setSelectedPhoto(item)}
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
        </Animated.View>
      )}

      <PhotoModal
        photo={selectedPhoto}
        visible={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
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
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  skeletonCard: {
    width: (width - 24) / 2,
    height: 220,
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
    overflow: 'hidden',
  },
  skeletonShimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a3e',
  },
});