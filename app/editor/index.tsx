import { StyleSheet, View, SafeAreaView  } from "react-native";
import htmlString from "../../lexical-editor/dist/htmlString";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRef, useState } from "react";
import { KeyboardAwareScrollView, KeyboardProvider } from "react-native-keyboard-controller";
import { Toolbar } from "../../components/Toolbar";
import { useRHHandler, onEventMessage, ACTIONS, EventPayload } from "../../types/Events";
import { addNote, autoSaveNote, getAllNotes } from "../../services/NotesDBService";

//const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;

const Editor = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [ noteId, setNotId ] = useState("");

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'action': 'Console', 'payload': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
  `;

  const onMessageFromWebView = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message) {
        if (message.action === 'Console') {
          console.info(`[Console] ${JSON.stringify(message.payload)}`);
        } else {
          onEventMessage(message);
        }
      }
    } catch (e) {
      console.error("[Editor] error parse web message", event.nativeEvent.data, e)
    }   
  };

  useRHHandler(ACTIONS.REDIRECT_MESSAGE_TO_WEB_RN, (eventMessage) => {
    const message = JSON.stringify( eventMessage );
    const safeString = JSON.stringify( message );
    webViewRef.current?.injectJavaScript(`window.onMessageFromRN(${safeString})`);
  });

  useRHHandler(ACTIONS.NOTIFY_STATE_CHANGE_RN, (eventMessage) => {
    console.debug("lexical state ", eventMessage);
    autoSaveNote(noteId, {title: eventMessage.titleText, content: eventMessage.jsonState}).then( id => {
      setNotId(id);
    }).catch( error => {
      console.error("[Editor] error save note", error)
    });
  });

  return (
    <KeyboardProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={{flex: 1}}>
          <WebView
            injectedJavaScript={debugging}
            ref={webViewRef}
            hideKeyboardAccessoryView={true}
            originWhitelist={['*']}
            style={styles.webView}
            source={{ html: htmlString }}
            onMessage={onMessageFromWebView}
          />
          <Toolbar />
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
