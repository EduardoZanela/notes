import {
    bridge,
    postMessageSchema,
    createWebView, 
    type Bridge
} from "@webview-bridge/react-native";
import { z } from "zod";
//import { getAllNotes } from "../services/NotesDBService";
import { OnChangePayload } from "../types/types";

const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;
export const EditorFormatSchema = z.enum(FormatOptions);

interface AppBridgeState extends Bridge {
  currentNoteId: string;
  setCurrentId(id: string): Promise<void>;
  changeNotification(payload: OnChangePayload): Promise<void>;
};

export const editorBridge = bridge({
  currentNoteId: "",
  async setCurrentId(id: string) {
    console.log("setting current id ", id);
    //set({currentNoteId: id});
  },
  async changeNotification(payload: OnChangePayload) {
    // const id = await autoSaveNote("", {
    //   title: payload.titleText!,
    //   content: payload.jsonState!
    // } );
    // this.setCurrentId(id);
    //const allNotes = await getAllNotes();
    //console.log("allNotes ", allNotes);
    console.log("payload ", payload);
  },
});

const editorSchema = postMessageSchema({
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