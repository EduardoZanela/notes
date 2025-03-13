import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Menu, IconButton } from "react-native-paper";
import { getAllNotes } from "../../services/databaseService";
import { Note } from "../../db/NotesDatabase";

const generateRandomPastel = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`; // Soft pastel colors
};


const NotesList = () => {
  
  const [notes, setNotes] = useState<Note[]>();
  getAllNotes().then((notes) => {
    setNotes(notes);
  }
  );
  
  const [menuVisible, setMenuVisible] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const backgroundColor = generateRandomPastel();
          return (
            <Card style={[styles.card, { backgroundColor }]}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: { marginVertical: 8, borderRadius: 10, padding: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", flexShrink: 1 },
  text: { fontSize: 14, color: "#333", marginTop: 5 },
  menuWrapper: { position: "relative", justifyContent: "center", alignItems: "center" },
  iceCircle: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(173, 216, 230, 0.3)", // Ice color with 30% transparency
    top: 8,
    right: 8,
  },
});

export default NotesList;
