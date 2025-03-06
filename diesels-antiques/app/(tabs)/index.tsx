import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import ProductCard from '../../components/ProductCard';
import { FontAwesome } from '@expo/vector-icons';

// Sample featured items data (in a real app, this would come from an API)
const FEATURED_ITEMS = [
  {
    id: '1',
    title: 'Vintage Victorian Chair',
    price: 1299.99,
    description: 'Beautifully preserved Victorian-era armchair with original upholstery and intricate wooden details.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Art Deco Table Lamp',
    price: 449.99,
    description: '1920s Art Deco table lamp with original glass shade and brass base.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Antique Pocket Watch',
    price: 899.99,
    description: 'Rare 19th century gold-plated pocket watch with intricate engravings.',
    imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Banner */}
      <View style={[styles.banner, { backgroundColor: colors.primary }]}>
        <Text style={[styles.bannerTitle, { color: colors.background }]}>
          Welcome to Diesel's Antiques
        </Text>
        <Text style={[styles.bannerSubtitle, { color: colors.background }]}>
          Discover Timeless Treasures
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <FontAwesome name="search" size={20} color={colors.muted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search antiques..."
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Featured Treasures
        </Text>
        <View style={styles.featuredContainer}>
          {FEATURED_ITEMS.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Popular Categories
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {['Furniture', 'Jewelry', 'Art', 'Decor', 'Collectibles'].map((category) => (
            <View 
              key={category} 
              style={[styles.categoryCard, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.categoryText, { color: colors.text }]}>{category}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuredContainer: {
    marginHorizontal: -16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryCard: {
    marginRight: 12,
    padding: 16,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
