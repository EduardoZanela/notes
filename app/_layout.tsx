import { Stack } from "expo-router";
import { Text } from "react-native";

const RootLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="editor" options={{ title: "New Note", headerShown: true, headerTitle: props => 
                 <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.children}</Text>
            }} />
        </Stack>
    );
};

export default RootLayout;
