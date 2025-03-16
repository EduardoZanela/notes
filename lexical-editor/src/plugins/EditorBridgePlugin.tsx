import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useRHHandler } from './Events'
import { ACTIONS } from '../../../types/Events'

import  {
    FORMAT_TEXT_COMMAND,
    EditorState,
    LexicalEditor,
    $getRoot
} from 'lexical'
import OnChangePayload from '../../../types/OnChangePayload';

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
        window.ReactNativeWebView?.postMessage(ACTIONS.NOTIFY_STATE_CHANGE_RN, payload);
    });
}

export function EditorBridgePlugin() {
    const [editor] = useLexicalComposerContext();

    useRHHandler(ACTIONS.FORMAT_ELEMENT_EVENT_WEB, (payload) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, payload.command);
    });
    
    return null;
}