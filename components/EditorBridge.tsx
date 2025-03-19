import { EventPaylod } from "../types/Events";
import { MutableRefObject, useRef } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

//const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;

export const onMessageFromWebView = (event: WebViewMessageEvent) => {
  console.log("event ", event.nativeEvent.data);
} 

export const postMessageToWebApp = (webViewRef: MutableRefObject<WebView | null>, payload: EventPaylod) => {
  webViewRef.current?.injectJavaScript(buildMessageJavaScript(payload));
}

const buildMessageJavaScript = (data: EventPaylod) => {
  const message = JSON.stringify({ data });
  // Stringify the message a second time to escape quotes etc.
  const safeString = JSON.stringify(message);
  return `window.onMessageFromRN(${safeString});`;
};