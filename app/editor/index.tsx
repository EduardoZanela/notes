import { StyleSheet, View, SafeAreaView  } from "react-native";
import htmlString from "@notes/lexical-editor/dist/htmlString";
import { WebView } from "@notes/components/EditorBridge";
import React from "react";
import { BridgeWebView } from "@webview-bridge/react-native";
import { KeyboardAwareScrollView, KeyboardProvider } from "react-native-keyboard-controller";
import { Toolbar } from "@notes/components/Toolbar";

const Editor = () => {
  const webviewRef = React.useRef<BridgeWebView>(null);

  return (
    <KeyboardProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={{flex: 1}}>
          <WebView 
            ref={webviewRef}
            style={styles.webView}
            source={{ html: htmlString }}
          />
          <Toolbar />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </KeyboardProvider>
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
