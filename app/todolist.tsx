import TodoItem from "@/components/ui/TodoItem";
import Feather from "@expo/vector-icons/Feather";
import { useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Study",
    isComplete: false,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Sleep",
    isComplete: false,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Dinner",
    isComplete: false,
  },
];

function TodoList() {
  const [data, setData] = useState(DATA);
  const [value, setValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleAddTodo = () => {
    if (!value.trim()) return;

    const newData = {
      id: uuid.v4().toString(),
      title: value,
      isComplete: false,
    };
    setData((prevData) => [...prevData, newData]);
    setValue("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleComplete = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData([...DATA]); // hoặc fetch lại từ API

      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>TodoList</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Thêm việc cần làm..."
          style={styles.input}
          onChangeText={(newText) => setValue(newText)}
          defaultValue={value}
        />
        <TouchableOpacity style={styles.plusWrap} onPress={handleAddTodo}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        style={styles.list}
        data={data}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            text={item.title}
            isComplete={item.isComplete}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  form: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderColor: "#ccc",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
  },
  plusWrap: {
    backgroundColor: "#555",
    padding: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    marginTop: 24,
    paddingBottom: 40,
    flex: 1,
  },
});

export default TodoList;
