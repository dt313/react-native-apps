import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "cloud";
          if (route.name === "today") iconName = "sunny";
          else if (route.name === "week") iconName = "calendar";
          else if (route.name === "exit") iconName = "exit";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        // Style nền của tab bar
        tabBarStyle: {
          backgroundColor: "#33333355",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60, // bạn có thể điều chỉnh chiều cao nếu muốn
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarActiveTintColor: "#f5b800ff",
      })}
    >
      <Tabs.Screen name="today" options={{ title: "Today" }} />
      <Tabs.Screen name="week" options={{ title: "Week" }} />
    </Tabs>
  );
}
