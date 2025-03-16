import { z } from "zod";
import { getAllNotes } from "../services/NotesDBService";
import OnChangePayload from "../types/OnChangePayload";
import { ActionType, EventPaylod } from "../types/Events";
import { useRef } from "react";
import WebView from "react-native-webview";

const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;

export const webViewRef = useRef<WebView | null>(null);

export const postMessageToWebApp = (payload: EventPaylod) => {
  webViewRef.current?.injectJavaScript(buildMessageJavaScript(payload));
}

const buildMessageJavaScript = (data: EventPaylod) => {
  const message = JSON.stringify({ data });
  // Stringify the message a second time to escape quotes etc.
  const safeString = JSON.stringify(message);
  return `window.onMessageFromRN(${safeString});`;
};