import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import Backbtn from "@/assets/svg/back.svg";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Mapviewer = (props: Props) => {
  const mapRef = useRef<MapView | null>(null);

  return (
    <SafeAreaView className="relative" style={{ flex: 1 }}>
      <View className="flex flex-row gap-3 items-center absolute top-10 left-0 z-40 px-3 py-4">
        <Backbtn onPress={() => router.back()} />
        <Text className="font-popmedium">Back</Text>
      </View>
      <MapView
        ref={mapRef}
        provider={Platform.OS == "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 6.5244,
          longitude: 7.5186,
          latitudeDelta: 0.1,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 6.5244, longitude: 7.5186 }} />
      </MapView>
    </SafeAreaView>
  );
};

export default Mapviewer;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
