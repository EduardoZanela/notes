import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { linkBridge } from "@webview-bridge/web";
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
    });
}

export function EditorBridgePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // return window. .addEventListener('formatElementEvent', (payload) => {
        //     editor.dispatchCommand(FORMAT_TEXT_COMMAND, payload);
        // });
    }, []);

    return null;
}