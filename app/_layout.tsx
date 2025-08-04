import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="todolist" options={{}} />
      <Stack.Screen name="weather" options={{ headerShown: false }} />
    </Stack>
  );
}
