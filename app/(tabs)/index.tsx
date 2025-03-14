import { router } from "expo-router";
import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { FloatingButton } from "../../components/FloatingButton";

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <FloatingButton onPress={() => { router.push("/editor") }} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  task: { fontSize: 18, padding: 5 },
});

