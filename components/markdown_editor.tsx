import React, { useState } from "react";
import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";
import Markdown from "react-native-markdown-display";

const MarkdownEditor = () => {
  const [text, setText] = useState("# Hello Markdown! \n\nEdit me!");

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <Appbar.Header>
        <Appbar.Content title="Markdown Editor" />
      </Appbar.Header>

      {/* Markdown Editor & Preview */}
      <ScrollView style={styles.content}>
        {/* Text Editor */}
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Write your Markdown here..."
        />

        {/* Preview Button */}
        <Button
          mode="contained"
          onPress={() => console.log("Markdown Saved!")}
          style={styles.button}
        >
          Save Markdown
        </Button>

        {/* Markdown Preview */}
        <Markdown style={styles.markdown}>{text}</Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  textInput: {
    minHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  button: { marginVertical: 10 },
  markdown: { fontSize: 16, color: "#333" },
});

export default MarkdownEditor;