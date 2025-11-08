import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PhotoModal({ photo, visible, onClose }) {
  if (!photo) return null;

  const openInUnsplash = () => {
    Linking.openURL(`https://unsplash.com/photos/${photo.id}`);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      hardwareAccelerated={true}
    >
      <View style={styles.modalOverlay}>
        {/* Fondo para cerrar */}
        <TouchableOpacity 
          style={styles.backdropButton}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Contenido del modal */}
        <View style={styles.modalContent}>
          {/* Header con botón cerrar */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Detalles de la Foto</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            {/* Imagen principal */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `https://picsum.photos/id/${photo.id}/800/800` }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.imageOverlay} />
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
                <Text style={styles.unsplashIcon}>🔗</Text>
                <Text style={styles.unsplashButtonText}>
                  Ver en Unsplash
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer con información del estudiante */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerName}>👨‍💻 Andy Aquino</Text>
                <Text style={styles.footerId}>📋 0909-22-1669</Text>
              </View>
              <View style={styles.footerDivider} />
              <View style={styles.footerRight}>
                <Text style={styles.footerExam}>📝 Examen Final</Text>
                <Text style={styles.footerSubject}>💻 Desarrollo Web</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  backdropButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: '#0f0f1e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: height * 0.92,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#667eea',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: Platform.OS === 'ios' ? 24 : 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
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
  imageOverlay: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 8,
    gap: 8,
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
  // Footer con información del estudiante
  footer: {
    backgroundColor: '#1a1a2e',
    borderTopWidth: 2,
    borderTopColor: '#667eea',
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
  },
  footerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  footerId: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  footerDivider: {
    width: 2,
    height: 40,
    backgroundColor: '#667eea',
    marginHorizontal: 16,
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerExam: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  footerSubject: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
});