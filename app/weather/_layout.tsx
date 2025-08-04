import * as Location from "expo-location";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";

type LocationType = {
  latitude: number | null;
  longitude: number | null;
} | null;

type WeatherContextType = {
  location: LocationType;
  locationName: string | null;
};

export const WeatherContext = createContext<WeatherContextType>({
  location: { latitude: null, longitude: null },
  locationName: "",
});

export default function WeatherLayout() {
  const [location, setLocation] = useState<LocationType>({
    latitude: null,
    longitude: null,
  });

  const [locationName, setLocationName] = useState<string | null>("");

  const getAreaName = async (latitude: number, longitude: number) => {
    try {
      const places = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (places.length > 0) {
        const place = places[0];
        console.log(
          "Tên khu vực:",
          place.city || place.region || place.subregion || place.country
        );
        setLocationName(
          place.city || place.region || place.subregion || place.country
        );
        return place;
      }
    } catch (error) {
      console.error("Lỗi reverse geocoding:", error);
    }
    return null;
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission denied");
      return;
    }

    try {
      const _location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = _location.coords;
      getAreaName(latitude, longitude);
      setLocation({
        latitude,
        longitude,
      });
      console.log("Vị trí hiện tại:", { _location });
    } catch (error) {
      console.error("Lỗi khi lấy vị trí:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <WeatherContext.Provider value={{ location, locationName }}>
      <StatusBar barStyle="light-content" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </WeatherContext.Provider>
  );
}

const styles = StyleSheet.create({});
