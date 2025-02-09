import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable } from "react-native";
import FloatingButton from "../../components/floating_button";
import MarkdownEditor from "../../components/markdown_editor";

const HomeScreen = () => {
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input }]);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <Pressable onPress={() => router.push({pathname: "notes/[id]", params: { id: item.id }})}>
            <Text style={styles.task}>{item.text}</Text>
          </Pressable> 
        }
      />
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

