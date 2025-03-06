import React, { useState } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  useColorScheme,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Colors } from '../../constants/Colors';
import ProductCard from '../../components/ProductCard';
import { FontAwesome } from '@expo/vector-icons';

// Sample data (in a real app, this would come from an API)
const ANTIQUE_ITEMS = [
  {
    id: '1',
    title: 'Vintage Victorian Chair',
    price: 1299.99,
    description: 'Beautifully preserved Victorian-era armchair with original upholstery and intricate wooden details.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
    category: 'Furniture'
  },
  {
    id: '2',
    title: 'Art Deco Table Lamp',
    price: 449.99,
    description: '1920s Art Deco table lamp with original glass shade and brass base.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
    category: 'Decor'
  },
  {
    id: '3',
    title: 'Antique Pocket Watch',
    price: 899.99,
    description: 'Rare 19th century gold-plated pocket watch with intricate engravings.',
    imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80',
    category: 'Collectibles'
  },
  {
    id: '4',
    title: 'Vintage Diamond Ring',
    price: 2499.99,
    description: 'Elegant 1940s diamond ring set in 18k gold with art deco styling.',
    imageUrl: 'https://images.unsplash.com/photo-1586878341523-7c1616df0f88?auto=format&fit=crop&q=80',
    category: 'Jewelry'
  },
  {
    id: '5',
    title: 'Antique Oil Painting',
    price: 3599.99,
    description: '19th century landscape oil painting in original gilt frame.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    category: 'Art'
  }
];

const CATEGORIES = ['All', 'Furniture', 'Jewelry', 'Art', 'Decor', 'Collectibles'];

export default function ListingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = ANTIQUE_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <FontAwesome name="search" size={20} color={colors.muted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search antiques..."
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedCategory === category ? colors.primary : colors.card,
              }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === category ? colors.background : colors.text }
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Listings Grid */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => <ProductCard {...item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listingsContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <FontAwesome name="search" size={48} color={colors.muted} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No antiques found
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.muted }]}>
            Try adjusting your search or category filters
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
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
    fontSize: 14,
    fontWeight: '500',
  },
  listingsContainer: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
});
