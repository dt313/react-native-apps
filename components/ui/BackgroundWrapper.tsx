import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export default function BackgroundWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <LinearGradient
        colors={["#9018c4ff", "#6e3ebf", "#0f0c29"]}
        locations={[0, 0.1, 1]}
        style={styles.background}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
      <TouchableOpacity style={styles.exit} onPress={() => router.push("/")}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  exit: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // nền mờ
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingLeft: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff", // viền trắng
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  exitText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
