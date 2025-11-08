import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PhotoModal({ photo, visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 9,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!photo) return null;

  const openInUnsplash = () => {
    Linking.openURL(`https://unsplash.com/photos/${photo.id}`);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Backdrop oscuro */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Contenedor del modal */}
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.modalContent}>
          {/* Header con botón cerrar */}
          <View style={styles.header}>
            <View style={styles.headerGradient}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Detalles de la Foto</Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Imagen principal */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `https://picsum.photos/id/${photo.id}/800/800` }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.imageGradient} />
            </View>

            {/* Información de la foto */}
            <View style={styles.infoSection}>
              {/* Card del Autor */}
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>👤</Text>
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Autor</Text>
                    <Text style={styles.infoValue}>{photo.author}</Text>
                  </View>
                </View>
              </View>

              {/* Card del ID */}
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>🆔</Text>
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>ID de la Foto</Text>
                    <Text style={styles.infoValue}>#{photo.id}</Text>
                  </View>
                </View>
              </View>

              {/* Card de Dimensiones */}
              <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📐</Text>
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Dimensiones</Text>
                    <Text style={styles.infoValue}>
                      {photo.width} × {photo.height} px
                    </Text>
                  </View>
                </View>
              </View>

              {/* Estadísticas */}
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{photo.width}</Text>
                  <Text style={styles.statLabel}>Ancho</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{photo.height}</Text>
                  <Text style={styles.statLabel}>Alto</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {(photo.width / photo.height).toFixed(2)}
                  </Text>
                  <Text style={styles.statLabel}>Ratio</Text>
                </View>
              </View>

              {/* Botón para ver en Unsplash */}
              <TouchableOpacity
                onPress={openInUnsplash}
                activeOpacity={0.8}
                style={styles.unsplashButton}
              >
                <View style={styles.unsplashGradient}>
                  <Text style={styles.unsplashIcon}>🔗</Text>
                  <Text style={styles.unsplashButtonText}>
                    Ver en Unsplash
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: height * 0.9,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 15, 30, 0.98)',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    overflow: 'hidden',
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#667eea',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1a1a2e',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  infoSection: {
    padding: 20,
    gap: 12,
  },
  infoCard: {
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    marginHorizontal: 8,
  },
  unsplashButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  unsplashGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
    backgroundColor: '#667eea',
  },
  unsplashIcon: {
    fontSize: 18,
  },
  unsplashButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});