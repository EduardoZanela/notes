import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faBold, 
    faItalic, 
    faCode,
    faUnderline,
    faStrikethrough
} from '@fortawesome/free-solid-svg-icons'
import { postMessage, EditorFormatSchema } from "./EditorBridge";
import { z } from "zod";

//const FormatOptions = ['bold', 'underline', 'strikethrough', 'italic', 'highlight', 'code', 'subscript', 'superscript', 'lowercase', 'uppercase', 'capitalize'] as const;

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