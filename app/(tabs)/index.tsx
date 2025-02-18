import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import FloatingButton from "../../components/floating_button";
import { RichText, TenTapStartKit, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { editorHtml } from "../../components/editor/build/editorHtml";

const HomeScreen = () => {
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input }]);
      setInput("");
    }
  };

  const editor = useEditorBridge({
    customSource: editorHtml,
    bridgeExtensions: [...TenTapStartKit],
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: 'Start editing!',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} hidden={false} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  task: { fontSize: 18, padding: 5 },
});

