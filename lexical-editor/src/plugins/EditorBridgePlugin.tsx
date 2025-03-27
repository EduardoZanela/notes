import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ACTIONS, type ActionType } from '../../../types/Events'

import  {
    FORMAT_TEXT_COMMAND,
    EditorState,
    LexicalEditor,
    $getRoot
} from 'lexical'
import { OnChangePayload } from '../../../types/OnChangePayload';
import EventEmitter from "events";
import { useEffect } from "react";

const RNEvents = new EventEmitter();

export const registerRNHandler = (action: ActionType, handler: (payload: any) => void) => {
    RNEvents.on(action, handler);
    return () => { RNEvents.off(action, handler); };
}

export const useRHHandler = (action: ActionType, handler: (payload: any) => void) => {
    useEffect(() => {
        const deregister = registerRNHandler(action, handler);
        return () => { deregister(); };
    }, [action, handler]);
}

export const onEventMessageFromRN = (message: string) => {
    let result;
    try {
        result = JSON.parse(message);
    } catch(e) {
        console.log(e);
        return;
    }
    const { action, payload } = result;
    RNEvents.emit(action, payload);
}

export function onLexicalEditorChange(editorState: EditorState, _latestEditor: LexicalEditor, _tags: Set<string>) {
    editorState.read(() => {
        const titleText: string = $getRoot().getAllTextNodes()?.[0].getTextContent();
        const plainText: string = $getRoot().getTextContent();
        const jsonState: string = JSON.stringify(editorState.toJSON())
        const payload: OnChangePayload = {
            ...(plainText && { plainText }),
            ...(titleText && { titleText }),
            ...(jsonState && { jsonState })
        };
        const message = JSON.stringify({ action: ACTIONS.NOTIFY_STATE_CHANGE_RN, payload });
        window.ReactNativeWebView?.postMessage(message);
    });
}

export function EditorBridgePlugin() {
    const [editor] = useLexicalComposerContext();
    useRHHandler(ACTIONS.FORMAT_ELEMENT_EVENT_WEB, (payload) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, payload.command);
    });
    
    return null;
}