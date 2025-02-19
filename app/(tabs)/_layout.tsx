import { Tabs } from "expo-router";

const TabsLayout = () => {  
    return (
        <Tabs screenOptions={{ headerShown: true }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="list" />
        </Tabs>
    );
}

export default TabsLayout;  