import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Menu, IconButton } from "react-native-paper";

const generateRandomPastel = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`; // Soft pastel colors
};

const NotesList = () => {
  const [notes, setNotes] = useState([
    { id: "1", title: "Shopping List", text: "Milk, eggs, bread, and cheese." },
    { id: "2", title: "Work Tasks", text: "Finish project report, send emails, and call clients." },
    { id: "3", title: "Ideas", text: "A new app idea that connects freelancers to local clients." },
  ]);
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

                  {/* Menu Button with Ice-Colored Circle */}
                  <View style={styles.menuWrapper}>
                    <View style={styles.iceCircle} />
                    <Menu
                      visible={menuVisible === item.id}
                      onDismiss={() => setMenuVisible(null)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          size={20}
                          onPress={() => toggleMenu(item.id)}
                        />
                      }
                    >
                      <Menu.Item onPress={() => console.log("Edit", item.id)} title="Edit" />
                      <Menu.Item onPress={() => console.log("Delete", item.id)} title="Delete" />
                      <Menu.Item onPress={() => console.log("Share", item.id)} title="Share" />
                    </Menu>
                  </View>
                </View>

                <Text style={styles.text}>
                  {item.text.length > 140 ? item.text.substring(0, 140) + "..." : item.text}
                </Text>
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
