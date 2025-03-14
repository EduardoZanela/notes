import {
    bridge,
    postMessageSchema,
} from "@webview-bridge/react-native";
import { createWebView } from "@webview-bridge/react-native";
import { AppBridgeState } from "../shared/types";
import { z } from "zod";
//import { autoSaveNote, getAllNotes } from "../services/NotesDBService";

const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;
export const EditorFormatSchema = z.enum(FormatOptions);

export const editorBridge = bridge<AppBridgeState>(({ set }) => ({
  currentNoteId: "",
  async setCurrentId(id: string) {
    set({ currentNoteId: id });
  },
  async changeNotification(payload) {
    // await autoSaveNote(get().currentNoteId, {
    //   title: payload.titleText,
    //   content: payload.jsonState
    // } );
    //const allNotes = await getAllNotes();
    //console.log("allNotes ", allNotes);
    console.log("payload ", payload);
  },
}));

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