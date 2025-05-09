// NotesListScreen.tsx
import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like hamburger and plus
import { useNavigation } from '@react-navigation/native';

const notes = [
  { id: '1', title: 'Meeting Notes', preview: 'Discuss quarterly goals and progress...', date: 'April 20' },
  { id: '2', title: 'Trip to Japan', preview: 'Itinerary, packing list, and travel tips for...', date: 'April 14' },
  { id: '3', title: 'Recipe Ideas', preview: 'New pasta recipe with tomato, basil, and...', date: 'April 6' },
  { id: '4', title: 'Book Recommendations', preview: '1384 by George Orwell, "To Kill a Mockingbird"', date: 'March 28' },
];

const categories = ['Work', 'Personal', 'Ideas'];

const categoryColors = [
    { backgroundColor: '#FFD700', textColor: '#000' }, // Gold
    { backgroundColor: '#FF69B4', textColor: '#fff' }, // Pink
    { backgroundColor: '#7FFFD4', textColor: '#000' }, // Aqua
    { backgroundColor: '#FF8C00', textColor: '#fff' }, // DarkOrange
    { backgroundColor: '#BA55D3', textColor: '#fff' }, // MediumOrchid
  ];

export default function NotesListScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Notes</Text>
        <View style={{ width: 28 }} /> {/* Spacer for balance */}
      </View>

      <TextInput style={styles.search} placeholder="Search" />
      
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.noteCard} onPress={() => navigation.navigate('Editor', { note: item })}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.notePreview}>{item.preview}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeader}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((cat, index) => {
            const colors = categoryColors[index % categoryColors.length]; // Cycle through colors if many categories
            return (
            <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, { backgroundColor: colors.backgroundColor }]}
            >
                <Text style={[styles.categoryText, { color: colors.textColor }]}>{cat}</Text>
            </TouchableOpacity>
            );
        })}
        </ScrollView>

      {/* Floating Add Note Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Editor', { note: {} })}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  header: { fontSize: 28, fontWeight: 'bold' },
  search: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10, marginBottom: 20 },
  noteCard: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 15, marginBottom: 15 },
  noteTitle: { fontSize: 18, fontWeight: 'bold' },
  notePreview: { fontSize: 14, color: '#666', marginTop: 5 },
  noteDate: { fontSize: 12, color: '#aaa', marginTop: 5 },
  subHeader: { fontSize: 20, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  categoryContainer: { flexDirection: 'row' },
  categoryChip: { backgroundColor: '#eee', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 10, alignSelf: 'flex-start' },
  categoryText: { fontSize: 14, fontWeight: '600' }, // A bit bolder to match the style
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});