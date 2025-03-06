import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '../constants/Colors';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductCard({ id, title, price, description, imageUrl }: ProductCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Link href={`/listing/${id}`} asChild>
      <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          defaultSource={require('../assets/images/placeholder.png')}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${price.toLocaleString()}
          </Text>
          <Text style={[styles.description, { color: colors.muted }]} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
