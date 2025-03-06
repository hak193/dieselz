import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

// Sample data (in a real app, this would come from an API)
const LISTINGS_DATA = {
  '1': {
    id: '1',
    title: 'Vintage Victorian Chair',
    price: 1299.99,
    description: 'Beautifully preserved Victorian-era armchair with original upholstery and intricate wooden details. This exceptional piece dates back to the late 19th century and features hand-carved mahogany frame with its original deep burgundy velvet upholstery. The chair showcases classic Victorian design elements including button tufting, rolled arms, and cabriole legs. Minor wear consistent with age adds to its authentic antique character.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
    seller: {
      name: 'John Doe',
      rating: 4.9,
      listings: 15,
    },
    condition: 'Good - Minor wear consistent with age',
    period: 'Late 19th Century',
    dimensions: '32"W x 36"D x 44"H',
    location: 'San Francisco, CA',
    listedDate: '2024-01-15',
  },
  '2': {
    id: '2',
    title: 'Art Deco Table Lamp',
    price: 449.99,
    description: '1920s Art Deco table lamp with original glass shade and brass base. This stunning piece features geometric patterns typical of the Art Deco period. The shade is made of frosted glass with amber tinting and shows no chips or cracks.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
    seller: {
      name: 'Jane Smith',
      rating: 4.8,
      listings: 23,
    },
    condition: 'Excellent',
    period: '1920s',
    dimensions: '12"W x 12"D x 24"H',
    location: 'New York, NY',
    listedDate: '2024-01-14',
  },
};

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const listing = LISTINGS_DATA[id as keyof typeof LISTINGS_DATA];

  if (!listing) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Listing not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Image */}
      <Image 
        source={{ uri: listing.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title and Price */}
        <Text style={[styles.title, { color: colors.text }]}>
          {listing.title}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${listing.price.toLocaleString()}
        </Text>

        {/* Quick Info */}
        <View style={[styles.quickInfo, { backgroundColor: colors.card }]}>
          <View style={styles.infoItem}>
            <FontAwesome name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              Listed {new Date(listing.listedDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="map-marker" size={20} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              {listing.location}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="info-circle" size={20} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              {listing.condition}
            </Text>
          </View>
        </View>

        {/* Seller Info */}
        <View style={[styles.sellerCard, { backgroundColor: colors.card }]}>
          <View style={styles.sellerInfo}>
            <FontAwesome name="user-circle" size={40} color={colors.primary} />
            <View style={styles.sellerDetails}>
              <Text style={[styles.sellerName, { color: colors.text }]}>
                {listing.seller.name}
              </Text>
              <View style={styles.sellerStats}>
                <FontAwesome name="star" size={16} color={colors.secondary} />
                <Text style={[styles.sellerRating, { color: colors.text }]}>
                  {listing.seller.rating} · {listing.seller.listings} listings
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: colors.primary }]}
            onPress={() => {/* Handle contact seller */}}
          >
            <Text style={[styles.contactButtonText, { color: colors.background }]}>
              Contact Seller
            </Text>
          </TouchableOpacity>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Details
          </Text>
          <View style={[styles.detailsGrid, { backgroundColor: colors.card }]}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>Period</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{listing.period}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: colors.muted }]}>Dimensions</Text>
              <Text style={[styles.detailValue, { color: colors.text }]}>{listing.dimensions}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Description
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {listing.description}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => {/* Handle make offer */}}
          >
            <Text style={[styles.actionButtonText, { color: colors.background }]}>
              Make an Offer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton, { borderColor: colors.primary }]}
            onPress={() => {/* Handle save */}}
          >
            <FontAwesome name="heart-o" size={20} color={colors.primary} />
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  sellerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sellerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sellerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sellerRating: {
    fontSize: 14,
  },
  contactButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailsGrid: {
    padding: 16,
    borderRadius: 12,
  },
  detailItem: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});
