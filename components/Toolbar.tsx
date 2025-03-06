import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBold } from '@fortawesome/free-solid-svg-icons'


export const Toolbar = () => {

    return (
        <View style={styles.toolbarContainer}>
            {/* Toolbar content */}
            <TouchableOpacity onPress={() => {}}>
                <View style={styles.touchableBg}>
                    <FontAwesomeIcon
                        icon={faBold}
                        style={styles.btnEnabled}
                        size={16}
                    />
                </View>            
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    toolbarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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