import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/images/logo.png";

function Weather() {
  const router = useRouter();

  return (
    <BackgroundWrapper>
      <View style={styles.wrapper}>
        <Image source={logo} style={[styles.image]} />

        <Text style={styles.whiteText}>Weather</Text>
        <Text style={styles.yellowText}>ForeCasts</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/weather/today")}
        >
          <Text style={styles.buttonText}>Get Start</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  image: {
    width: "100%",
    height: "40%",
    resizeMode: "contain",
  },

  button: {
    marginTop: 40,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#DDB130",
    margin: 10,
    width: 300,
    paddingHorizontal: 40,
    paddingVertical: 18,
  },

  buttonText: {
    color: "#362A84",
    fontWeight: "700",
    fontSize: 30,
    letterSpacing: 1,
  },
  whiteText: {
    marginTop: 32,
    backgroundColor: "transparent",
    fontSize: 68,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#fff",
  },

  yellowText: {
    backgroundColor: "transparent",
    color: "#DDB130",
    fontWeight: "600",
    fontSize: 64,
    letterSpacing: 1,
  },
});

export default Weather;
