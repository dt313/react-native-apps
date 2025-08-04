import { useNavigation } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity } from "react-native";

type LinkProps = {
  children: ReactNode;
  link: string | string[];
};

function Link({ children, link }: LinkProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(link)}
      style={{
        padding: 12,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        margin: 10,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{children}</Text>
    </TouchableOpacity>
  );
}

export default Link;
