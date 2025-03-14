import { type Bridge } from "@webview-bridge/react-native";

export type OnChangePayload = {
    titleText?: string;
    plainText?: string;
    jsonState?: string;
};

export interface AppBridgeState extends Bridge {
   currentNoteId: string;
   setCurrentId(id: string): Promise<void>;
   changeNotification: (payload: OnChangePayload) => Promise<void>;
}
