import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native";

const NotePage = () => {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>Notes Page id {id}</Text>
        </View>
    );
};

export default NotePage;