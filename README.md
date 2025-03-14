TODO 
- Add more toolbar items from playground
- Add a long press button for option like H1, H2, H3, etc
- Add a color picker for highlight
- Add a new node to transform first line into a title https://lexical.dev/docs/api/modules/lexical_react_LexicalAutoLinkPlugin

- Look chat gpt topics



// When doing the toolbar state, can use this code to get if current node is bold and change the toolbar bold button style 
const selection = $getSelection()
 editorState.read(() => {
    if ($isRangeSelection(selection)) {
        console.log(selection?.hasFormat('bold'));
    }

    const node = selection?.getNodes()[0]
    console.log(node);
});

use windows param to set initial state 
inject javascript webview 
use state to hold id and session to current editor state 
create note id at useeffect

save before app close or before fo back page 
delete if note empty

set navigation header title when text nodes> 1 and selection is not first node get previous siblings is root? or use node key

how long can a title be? limit size to save on db

how to merge notes when syncing from multiple devicesABDROID
