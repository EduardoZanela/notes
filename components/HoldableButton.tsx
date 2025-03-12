import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

export const HoldableButton = ({icon, options, onSelect}) => {
    const [showOption, setShowOption] = useState(false);
    const scaleAnim = useRef(new Animated.Value(0)).current;

    const handleLongPress = () => {
        setShowOption(true);
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    };

    const handleSelect = (option) => {
        setShowOption(false);
        onSelect?.(option);
    };
    
    return (
        <View style={styles.container}>
            { showOption && 
                <Animated.View style={[styles.optionsContainer, {transform: [{scale: scaleAnim}]}]}>
                    {options.map((option, index) => (
                        <TouchableOpacity style={styles.option} key={index} onPress={() => handleSelect(option.command)}>
                            <FontAwesomeIcon icon={option.icon} style={styles.btnEnabled} size={15} />
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            }
            <TouchableOpacity style={styles.button}
                onPress={() => handleSelect(options[0])}
                onLongPress={handleLongPress}
                onPressOut={() => setTimeout(() => setShowOption(false), 200)}>
                <FontAwesomeIcon icon={icon} style={styles.btnEnabled} size={15} />
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
    alignItems: "center",
    justifyContent: "center",
    },
    button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    },
    buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    },
    optionsContainer: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: "row",
    },
    option: {
    padding: 10,
    marginHorizontal: 5,
    },
    btnEnabled: {
    }
});