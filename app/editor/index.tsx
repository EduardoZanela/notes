import { StyleSheet, View, SafeAreaView  } from "react-native";
import htmlString from "../../lexical-editor/dist/htmlString";
import { WebView } from "react-native-webview";
import { useRef } from "react";
import { KeyboardAwareScrollView, KeyboardProvider } from "react-native-keyboard-controller";
import { Toolbar } from "../../components/Toolbar";
import { onMessageFromWebView } from "../../components/EditorBridge";

const Editor = () => {
  const webViewRef = useRef<WebView | null>(null);

  return (
    <KeyboardProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={{flex: 1}}>
          <WebView
            ref={webViewRef}
            hideKeyboardAccessoryView={true}
            originWhitelist={['*']}
            style={styles.webView}
            source={{ html: htmlString }}
            onMessage={onMessageFromWebView}
          />
          <Toolbar ref={webViewRef} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  webView: {
    width: "100%", 
    height: "100%"
  }
});

export default Editor;
