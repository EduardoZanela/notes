import React from 'react'
import ReactDOM from 'react-dom/client'
import { Editor } from "./Editor";
import './index.css'
import { onEventMessageFromRN } from './plugins/EditorBridgePlugin';

declare global {
  interface Window {
    ReactNativeWebView: any;
    onMessageFromRN: (message: string) => void;
  }
}

window.onMessageFromRN = onEventMessageFromRN;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)