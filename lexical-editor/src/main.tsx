import React from 'react'
import ReactDOM from 'react-dom/client'
import { Editor } from "./Editor";
import './index.css'

declare global {
  interface Window {
    ReactNativeWebView: any;
    onMessageFromRN: (message: string) => void;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)