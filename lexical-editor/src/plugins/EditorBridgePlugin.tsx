import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { EditorBridge, EditorPostMessageSchema } from '../../../components/EditorBridge';
import { linkBridge } from "@webview-bridge/web";
import  {
    FORMAT_TEXT_COMMAND,
    EditorState,
    LexicalEditor,
    $getRoot
} from 'lexical'
import { OnChangePayload } from '../../../shared/types';

const bridge = linkBridge<EditorBridge, EditorPostMessageSchema>({
    throwOnError: true
});

export function onLexicalEditorChange(editorState: EditorState, _latestEditor: LexicalEditor, _tags: Set<string>) {
    if (bridge) { // && bridgeReady
        editorState.read(() => {
            let titleText : string = "";
            if ($getRoot().getAllTextNodes().length > 0) {
                titleText = $getRoot().getAllTextNodes()[0].getTextContent();
            }
            const plainText: string = $getRoot().getTextContent();
            const jsonState: string = JSON.stringify(editorState.toJSON())
            const payload: OnChangePayload = {
                ...(plainText && { plainText }),
                ...(titleText && { titleText }),
                ...(jsonState && { jsonState })
            };
            (async function () {
                await bridge.changeNotification(payload);
            })().catch();
        });
    }
}

export function EditorBridgePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return bridge.addEventListener('formatElementEvent', (payload) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, payload);
        });
    }, []);

    return null;
}