import house from "@/assets/images/house.png";
import logo from "@/assets/images/logo.png";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { WeatherContext } from "../_layout";

import { changeKelvinToCelsius } from "@/app/weather/utils";

type TempType = {
  max: number;
  min: number;
  temp: number;
};

function Today() {
  const { location, locationName } = useContext(WeatherContext);

  const [temp, setTemp] = useState<TempType>({
    max: 0,
    min: 0,
    temp: 0,
  });

  const [today, setToday] = useState("");

  const [hourlyTemp, setHourlyTemp] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemp({
          max: changeKelvinToCelsius(data.main.temp_max),
          min: changeKelvinToCelsius(data.main.temp_min),
          temp: changeKelvinToCelsius(data.main.temp),
        });
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const hourlyList = data.list?.slice(0, 9).map((item: any) => ({
          time: dayjs(item.dt_txt).format("HH:mm"),
          temp: changeKelvinToCelsius(item.main.temp),
          weather: item.weather[0].description,
        }));

        setToday(dayjs(data.list[0].time).format("MMMM D"));
        setHourlyTemp(hourlyList);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  }, []);

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.currentInfo}>
          <Image source={logo} style={styles.cloud} />
          <Text style={styles.temperature}>{temp.temp}°</Text>
          <Text style={styles.precipitations}>{locationName}</Text>
          <View style={styles.precipitationWrap}>
            <Text style={styles.precipitations}>Min: {temp.min}°C</Text>
            <Text style={styles.precipitations}>Min: {temp.max}°C</Text>
          </View>
        </View>
        <Image source={house} style={styles.house} />

        <LinearGradient
          style={styles.today}
          colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
          locations={[0, 0.1, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.todayHeader}>
            <Text style={styles.headerText}>Today</Text>
            <Text style={styles.headerText}>{today}</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.todayBody}
          >
            {hourlyTemp.map(({ time, temp }, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.time}>{time}</Text>
                <Image
                  source={logo}
                  style={{ width: 80, height: 80, resizeMode: "cover" }}
                />
                <Text style={styles.temp}>{temp}</Text>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 60,
    display: "flex",
    alignItems: "center",
  },
  currentInfo: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    marginBottom: 32,
  },
  cloud: {
    width: 250,
    height: 200,
    resizeMode: "cover",
  },
  temperature: {
    fontSize: 70,
    color: "#fff",
    fontWeight: "600",
  },

  precipitations: { fontSize: 24, color: "#fff" },
  precipitationWrap: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    columnGap: 20,
  },

  today: {
    width: "100%",
    height: 246,
    paddingVertical: 8,
    borderRadius: 32,
  },
  house: {
    width: 336,
    height: 198,
    resizeMode: "cover",
  },
  todayHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#8D78C8",
    paddingVertical: 12,
    paddingHorizontal: 40,
  },

  headerText: { fontSize: 20, fontWeight: 500, color: "#fff" },
  todayBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingRight: 40,
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
  },

  time: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },

  temp: {
    color: "#fff",
    fontSize: 20,

    fontWeight: "bold",
  },
});

export default Today;
