import Link from "@/components/ui/Link";
import { View } from "react-native";
function Home() {
  return (
    <View>
      <Link link="todolist">TodoList</Link>
      <Link link="weather">Weather App</Link>
    </View>
  );
}

export default Home;
