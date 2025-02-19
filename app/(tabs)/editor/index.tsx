import { StyleSheet, View, SafeAreaView  } from "react-native";
import WebView from "react-native-webview"
import htmlString from "../../../lexical-editor/dist/htmlString";

const Editor = () => {
  return (
    <SafeAreaView style={styles.container}>
        <WebView styles={styles.webView}
          source={{ html: htmlString }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    width: "100%", 
    height: "100%"
  }
});

export default Editor;
