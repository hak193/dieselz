import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';

// Sample user data (in a real app, this would come from an API/auth system)
const USER_DATA = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: 'January 2024',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
  listings: [
    {
      id: '1',
      title: 'Vintage Victorian Chair',
      price: 1299.99,
      description: 'Beautifully preserved Victorian-era armchair with original upholstery.',
      imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'Art Deco Table Lamp',
      price: 449.99,
      description: '1920s Art Deco table lamp with original glass shade.',
      imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80',
    },
  ],
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.background }]}>
              {USER_DATA.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.background }]}>
              {USER_DATA.email}
            </Text>
            <Text style={[styles.joinDate, { color: colors.background }]}>
              Member since {USER_DATA.joinDate}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={() => {/* Handle edit profile */}}
        >
          <FontAwesome name="user" size={20} color={colors.primary} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.card }]}
          onPress={() => {/* Handle settings */}}
        >
          <FontAwesome name="cog" size={20} color={colors.primary} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {USER_DATA.listings.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Listings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>4.9</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Sales</Text>
        </View>
      </View>

      {/* My Listings Section */}
      <View style={styles.listingsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          My Listings
        </Text>
        <View style={styles.listingsContainer}>
          {USER_DATA.listings.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={() => {/* Handle logout */}}
      >
        <FontAwesome name="sign-out" size={20} color={colors.background} />
        <Text style={[styles.logoutButtonText, { color: colors.background }]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  listingsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  listingsContainer: {
    marginHorizontal: -16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
