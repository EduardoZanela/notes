import {
    bridge,
    postMessageSchema,
} from "@webview-bridge/react-native";
import { createWebView } from "@webview-bridge/react-native";
import { z } from "zod";

const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;
const EditorFormatSchema = z.enum(FormatOptions);

export const editorBridge = bridge({
  async getMessage() {
    return "I'm from native" as const;
  }
});

export const editorSchema = postMessageSchema({
    formatElementEvent: {
        validate: (value) => {
            return EditorFormatSchema.parse(value);
        },
    }
});

export const { WebView, postMessage } = createWebView({
    bridge: editorBridge,
    postMessageSchema: editorSchema,
    debug: true
});

export type EditorBridge = typeof editorBridge;
export type EditorPostMessageSchema = typeof editorSchema;