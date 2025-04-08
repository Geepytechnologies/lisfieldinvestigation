import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { router } from "expo-router";
import Reload from "@/assets/svg/reload.svg";
import useLocationProvider from "@/hooks/shared/useLocationProvider";

type Props = {};

const Q5 = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { location, getLocation } = useLocationProvider();
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={5} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Get the coordinate of the centre point of land. Stand in the
          approximate centre point and click the capture button.
        </Text>
      </View>
      <View className="px-6 items-center justify-center flex gap-5 flex-1 ">
        <View className="w-full gap-3">
          <View className="flex items-center justify-center">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={getLocation}
              className="bg-black max-w-[190px] flex flex-col justify-center gap-3 py-3 px-6 rounded-[12px]"
            >
              <Text className="text-sm text-center text-white font-popmedium uppercase leading-normal">
                Capture Coordinate
              </Text>
              <View className="flex items-center justify-center">
                <Reload />
              </View>
            </TouchableOpacity>
          </View>
          {/* geolocation */}
          <View className="flex flex-row items-center gap-6">
            <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
              <Text className="text-[10px] uppercase leading-normal">
                Longitude
              </Text>
              <Text className="">{location?.coords.longitude || "-"}</Text>
            </View>
            <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
              <Text className="text-[10px] uppercase leading-normal">
                Latitude
              </Text>
              <Text className="">{location?.coords.latitude || "-"}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q6")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q5;

const styles = StyleSheet.create({});
