import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {
  RichText,
  useEditorBridge,
  useBridgeState,
  type EditorBridge,
  TenTapStartKit,
  Toolbar,
} from '@10play/tentap-editor';

import { editorHtml } from './editor/build/editorHtml';

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export const AdvancedRichText = ({}: NativeStackScreenProps<any, any, any>) => {
  const editor = useEditorBridge({
    customSource: editorHtml,
    bridgeExtensions: [...TenTapStartKit],
    autofocus: false,
    avoidIosKeyboard: true,
  });
  const TapRef = useRef(null);

  return (
    <SafeAreaView style={exampleStyles.fullScreen} ref={TapRef}>
      <View style={exampleStyles.fullScreen}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={exampleStyles.keyboardAvoidingView}>
          <Toolbar editor={editor} hidden={false}  />
        </KeyboardAvoidingView>      
      </View>
      <RichText editor={editor} />
    </SafeAreaView>
  );
};