import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBold, faItalic, faCode } from '@fortawesome/free-solid-svg-icons'
import { postMessage, EditorFormatSchema } from "./EditorBridge";

const toolbarItems = [
    {
        command: 'bold',
        icon: faBold
    },
    {
        command: 'italic',
        icon: faItalic
    },
    {
        id: 2,
        command: 'code',
        icon: faCode
    }
]

/* TODO 
    - Code needs a gray background
    - Add more toolbar items
    - Add custom Toolbar items from who is importing the Toolbar component
*/
export const Toolbar = ({items = toolbarItems}) => {

    return (
        <View style={styles.toolbarContainer}>
            {/* Toolbar content */}            
            {items.map((item) => (
                <TouchableOpacity onPress={() => { postMessage('formatElementEvent',  EditorFormatSchema.parse(item.command) ) }}>
                    <View style={styles.touchableBg}>
                        <FontAwesomeIcon
                            icon={item.icon}
                            style={styles.btnEnabled}
                            size={16}
                        />
                    </View>            
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    toolbarContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0"
    },
    touchableBg: {
        padding: 4,
      },
    touchableBgActive: {
        padding: 4,
        backgroundColor: '#bbb',
        borderRadius: 8,
    },
    btnEnabled: {
        color: '#000',
    },
    btnDisabled: {
        color: '#aaa',
    },
    btnActive: {
        backgroundColor: '#999',
    },
});