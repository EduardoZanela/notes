import {
    bridge,
    postMessageSchema,
} from "@webview-bridge/react-native";
import { createWebView } from "@webview-bridge/react-native";
import { OnChangePayload } from "../shared/types";
import { z } from "zod";
import { useState } from "react";
import { addNote, updateNote } from "../services/NotesDBService";

const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;
export const EditorFormatSchema = z.enum(FormatOptions);

const [currentId, setCurrentId] = useState<number | null>(null);

export const editorBridge = bridge({
  async changeNotification(payload: OnChangePayload) {
    //console.log('Native change side ', payload);
    if(currentId == null) {
      addNote({
        title: payload.titleText || "",
        content: payload.plainText || "",
        createdAt: Date.now(),
        updatedAt: Date.now()
      }).then((id) => {
        if(id) {
          setCurrentId(id);
        }
      })
    } else {
      updateNote(currentId, {
        title: payload.titleText || "",
        content: payload.plainText || "",
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
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