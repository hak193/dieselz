import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  Image
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CATEGORIES = ['Furniture', 'Jewelry', 'Art', 'Decor', 'Collectibles'];

export default function NewListingScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: [] as string[],
    contactInfo: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: '',
    contactInfo: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      price: '',
      description: '',
      category: '',
      images: '',
      contactInfo: '',
    };

    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!form.price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(form.price))) {
      newErrors.price = 'Price must be a valid number';
      isValid = false;
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!form.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (form.images.length === 0) {
      newErrors.images = 'At least one image is required';
      isValid = false;
    }

    if (!form.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, this would send the data to an API
      Alert.alert(
        'Success!',
        'Your antique has been listed for sale.',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      price: '',
      description: '',
      category: '',
      images: [],
      contactInfo: '',
    });
    setErrors({
      title: '',
      price: '',
      description: '',
      category: '',
      images: '',
      contactInfo: '',
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setForm(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Title</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter title"
            placeholderTextColor={colors.muted}
            value={form.title}
            onChangeText={(text) => setForm(prev => ({ ...prev, title: text }))}
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
        </View>

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Price ($)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter price"
            placeholderTextColor={colors.muted}
            keyboardType="decimal-pad"
            value={form.price}
            onChangeText={(text) => setForm(prev => ({ ...prev, price: text }))}
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
        </View>

        {/* Category Selection */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  { 
                    backgroundColor: form.category === category ? colors.primary : colors.card,
                  }
                ]}
                onPress={() => setForm(prev => ({ ...prev, category }))}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: form.category === category ? colors.background : colors.text }
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter description"
            placeholderTextColor={colors.muted}
            multiline
            numberOfLines={4}
            value={form.description}
            onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
          />
          {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
        </View>

        {/* Image Upload */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Images</Text>
          <TouchableOpacity
            style={[styles.imageUploadButton, { backgroundColor: colors.card }]}
            onPress={pickImage}
          >
            <FontAwesome name="camera" size={24} color={colors.primary} />
            <Text style={[styles.imageUploadText, { color: colors.text }]}>Add Photos</Text>
          </TouchableOpacity>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.imagePreviewContainer}
          >
            {form.images.map((uri, index) => (
              <View key={index} style={styles.imagePreview}>
                <Image source={{ uri }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <FontAwesome name="times-circle" size={24} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {errors.images ? <Text style={styles.errorText}>{errors.images}</Text> : null}
        </View>

        {/* Contact Information */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Contact Information</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
            placeholder="Enter email or phone number"
            placeholderTextColor={colors.muted}
            value={form.contactInfo}
            onChangeText={(text) => setForm(prev => ({ ...prev, contactInfo: text }))}
          />
          {errors.contactInfo ? <Text style={styles.errorText}>{errors.contactInfo}</Text> : null}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Text style={[styles.submitButtonText, { color: colors.background }]}>
            List for Sale
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageUploadText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imagePreview: {
    marginRight: 12,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
