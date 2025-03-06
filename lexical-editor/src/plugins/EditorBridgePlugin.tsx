import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { EditorBridge, EditorPostMessageSchema } from '../../../components/EditorBridge';
import { linkBridge } from "@webview-bridge/web";
import  {
    FORMAT_TEXT_COMMAND
} from 'lexical'

export function EditorBridgePlugin() {
    const [editor] = useLexicalComposerContext();
    const bridge = linkBridge<EditorBridge, EditorPostMessageSchema>({
        throwOnError: true
    });

    useEffect(() => {
        return bridge.addEventListener('formatElementEvent', (payload) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, payload);
        });
    }, []);

    return null;
}