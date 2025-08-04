import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type TodoItemProps = {
  id: string;
  text: string;
  isComplete: boolean;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
};

function TodoItem({
  id,
  text,
  isComplete,
  onComplete,
  onDelete,
}: TodoItemProps) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.checkbox, isComplete && styles.completeTodo]}
        onPress={() => onComplete(id)}
      >
        {isComplete && (
          <Entypo
            name="check"
            size={20}
            color={isComplete ? "white" : "black"}
          />
        )}
      </TouchableOpacity>
      <Text style={[styles.text, isComplete && styles.completedText]}>
        {text}
      </Text>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: "#55555544",
    justifyContent: "space-between",
  },
  completeTodo: {
    backgroundColor: "#333",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#55555544",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  completedText: { textDecorationLine: "line-through", color: "#999" },

  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    marginRight: 12,
  },
});

export default TodoItem;
