import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

const placeholder = 'Enter some rich text...';

function onError(error: unknown) {
    console.error(error);
}

export function Editor() {
    const editorConfig = {
        namespace: 'editor',
        onError,
      }

    return (
        <LexicalComposer initialConfig={editorConfig} >
           <RichTextPlugin
            contentEditable={
                <ContentEditable
                    className="editor-input"
                    aria-placeholder={placeholder}
                    placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                    }
                />
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
        </LexicalComposer>
    );
}