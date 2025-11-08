import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 24) / 2;

export default function PhotoCard({ photo, onPress, index }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 50,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        delay: index * 50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { scale: pressAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: `https://picsum.photos/id/${photo.id}/400/400` }}
            style={styles.image}
            resizeMode="cover"
          />
          
          <View style={styles.overlay}>
            <View style={styles.infoContainer}>
              <Text style={styles.authorText} numberOfLines={1}>
                👤 {photo.author}
              </Text>
              <View style={styles.dimensionsContainer}>
                <Text style={styles.dimensionsText}>
                  {photo.width} × {photo.height}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.shineEffect} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    margin: 4,
  },
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  card: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  infoContainer: {
    gap: 4,
  },
  authorText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  dimensionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dimensionsText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.9,
  },
  shineEffect: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 60,
  },
});