import logo from "@/assets/images/logo.png";
import BackgroundWrapper from "@/components/ui/BackgroundWrapper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WeatherContext } from "../_layout";
import { changeKelvinToCelsius } from "../utils";
dayjs.extend(utc);
dayjs.extend(timezone);
type TempType = {
  max: number;
  min: number;
  temp: number;
  cloud: string;
  sunrise: string;
  sunset: string;
};

function Week() {
  const scrollRef = useRef<ScrollView>(null);
  const [hourlyTemp, setHourlyTemp] = useState([]);
  const { location, locationName } = useContext(WeatherContext);
  const [temp, setTemp] = useState<TempType>({
    max: 0,
    min: 0,
    temp: 0,
    cloud: "",
    sunrise: "",
    sunset: "",
  });
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const timezoneOffset = data.timezone;

        const sunriseLocal = dayjs
          .unix(data.sys.sunrise)
          .utc()
          .add(timezoneOffset, "second")
          .format("hh:mm A");
        const sunsetLocal = dayjs
          .unix(data.sys.sunset)
          .utc()
          .add(timezoneOffset, "second")
          .format("hh:mm A");

        console.log("Sunrise:", sunriseLocal); // vd: 06:15
        console.log("Sunset:", sunsetLocal); // vd: 19:15
        setTemp({
          max: changeKelvinToCelsius(data.main.temp_max),
          min: changeKelvinToCelsius(data.main.temp_min),
          temp: changeKelvinToCelsius(data.main.temp),
          cloud: data.weather[0].description,
          sunrise: sunriseLocal,
          sunset: sunsetLocal,
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
        const hourlyList = data.list.map((item: any) => ({
          time: dayjs(item.dt_txt).format("ddd"),
          temp: changeKelvinToCelsius(item.main.temp),
          weather: item.weather[0].description,
        }));

        setHourlyTemp(hourlyList);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch:", error);
      });
  }, []);

  const handleScrollRight = () => {
    scrollRef.current?.scrollTo({ x: 500, animated: true });
  };

  const handleScrollLeft = () => {
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  };

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.currentInfo}>
          <Text style={styles.precipitations}>{locationName}</Text>
          <View style={styles.precipitationWrap}>
            <Text style={styles.precipitations}>Min: {temp.min}°C</Text>
            <Text style={styles.precipitations}>Min: {temp.max}°C</Text>
          </View>
        </View>

        <View style={styles.week}>
          <Text style={styles.weekHeader}>5-Days Forecasts</Text>
          <View style={styles.listWrap}>
            <TouchableOpacity
              onPress={handleScrollLeft}
              style={{ paddingVertical: 40 }}
            >
              <SimpleLineIcons name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.todayBody}
            >
              {hourlyTemp.map(({ time, temp }, index) => (
                <LinearGradient
                  colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
                  locations={[0, 0.1, 1]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  key={index}
                  style={styles.itemBg}
                >
                  <View style={styles.item}>
                    <Text style={styles.temp}>{temp}</Text>
                    <Image
                      source={logo}
                      style={{ width: 60, height: 60, resizeMode: "cover" }}
                    />
                    <Text style={styles.day}>{time}</Text>
                  </View>
                </LinearGradient>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={handleScrollRight}
              style={{ paddingVertical: 40 }}
            >
              <SimpleLineIcons name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
          locations={[0.1, 0.3, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.quality}
        >
          <View style={styles.qualityHeader}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color="white"
            />
            <Text style={styles.qualityHeaderText}>AIR QUALITY</Text>
          </View>

          <Text style={styles.qualityContent}>{temp.cloud}</Text>
          <LinearGradient
            colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
            locations={[0.1, 0.3, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.br}
          ></LinearGradient>

          <View style={styles.seeMore}>
            <Text style={styles.seeMoreText}>See more</Text>
            <SimpleLineIcons name="arrow-right" size={20} color="white" />
          </View>
        </LinearGradient>
        <View style={styles.footer}>
          <LinearGradient
            colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
            locations={[0.1, 0.3, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.box}
          >
            <View style={styles.boxHeader}>
              <FontAwesome name="sun-o" size={24} color="white" />
              <Text style={styles.boxHeaderText}>SUNRISE</Text>
            </View>
            <Text style={styles.boxBodyText}>{temp.sunrise}</Text>
            <Text style={styles.boxBottomText}>Sunset: 7.25PM</Text>
          </LinearGradient>
          <LinearGradient
            colors={["#9553b1ff", "#804ed7ff", "#241e53ff"]}
            locations={[0.1, 0.3, 0.6]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.box}
          >
            <View style={styles.boxHeader}>
              <FontAwesome name="sun-o" size={24} color="white" />
              <Text style={styles.boxHeaderText}>SUNSET</Text>
            </View>
            <Text style={styles.boxBodyText}>{temp.sunset}</Text>
            <Text style={styles.boxBottomText}>Sunset: 7.25PM</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    paddingTop: 120,
    paddingBottom: 100,
    display: "flex",
    alignItems: "center",
  },
  currentInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: 32,
  },

  precipitations: { fontSize: 24, color: "#fff" },
  precipitationWrap: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    columnGap: 20,
  },

  week: {
    width: "100%",
  },
  weekHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 40,
    marginBottom: 20,
  },

  listWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  todayBody: {
    marginHorizontal: 4,
    paddingRight: 40,
  },

  itemBg: {
    marginRight: 4,
    borderRadius: 50,
  },

  item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },

  day: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },

  temp: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  quality: {
    marginTop: 40,
    width: "80%",
    display: "flex",
    padding: 24,
    borderRadius: 30,
  },

  qualityHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  qualityHeaderText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },

  qualityContent: {
    marginVertical: 12,
    fontSize: 30,
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  seeMore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeMoreText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },

  br: {
    height: 4,
    width: "100%",
    marginBottom: 12,
  },

  footer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    gap: 12,
  },
  box: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F7CBFD",
  },
  boxHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  boxHeaderText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },

  boxBodyText: {
    marginVertical: 12,
    fontSize: 28,
    color: "#fff",
    fontWeight: "500",
  },
  boxBottomText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default Week;
