import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faBold, 
    faItalic, 
    faCode,
    faUnderline,
    faStrikethrough
} from '@fortawesome/free-solid-svg-icons'
import { z } from "zod";
import { ACTIONS, postMessageToWebApp } from "../types/Events";

export const DEFAULT_ITEMS = [
    {
        command: 'bold',
        icon: faBold
    },
    {
        command: 'italic',
        icon: faItalic
    },
    {
        command: 'underline',
        icon: faUnderline
    },
    {
        command: 'strikethrough',
        icon: faStrikethrough
    },
    {
        command: 'code',
        icon: faCode
    }
]

// Define the Zod schema for props validation
const itemsSchema = z.array(
    z.object({
        command: z.string(),
        icon: z.any(),
    }).optional()
);

export const Toolbar = ({items = DEFAULT_ITEMS}) => {
    itemsSchema.parse(items);
    return (
        <View style={styles.toolbarContainer}>
            {/* Toolbar content */}            
            {items.map((item) => (
                <TouchableOpacity key={item.command} onPress={() => { postMessageToWebApp({ action: ACTIONS.FORMAT_ELEMENT_EVENT_WEB, payload: { command: item.command } }) }} >
                    <View style={styles.touchableBg}>
                        <FontAwesomeIcon
                            icon={item.icon}
                            style={styles.btnEnabled}
                            size={15}
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
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        elevation: 10,
        borderTopLeftRadius: 5,  // Round top-left corner
        borderTopRightRadius: 5, // Round top-right corner
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 10 }, // iOS
        shadowOpacity: 0.1, // iOS
        shadowRadius: 20, // iOS
    },
    touchableBg: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
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