import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorBridgePlugin, onLexicalEditorChange } from './plugins/EditorBridgePlugin';
import './Editor.css';
import EditorTheme from './EditorTheme';

function onError(error: unknown) {
  console.error(error);
}

export function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: EditorTheme,
    onError
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <EditorBridgePlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onLexicalEditorChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}