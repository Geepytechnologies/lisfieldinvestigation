import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RightCaret from "@/assets/svg/right-caret.svg";
import { router } from "expo-router";

type Props = {
  item: any;
};

const SurveyTaskCard = ({ item }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: "/(protected)/tasks/assignedtask",
          params: { id: item.id },
        })
      }
      className="flex flex-row justify-between py-3"
    >
      <View className="">
        <View className="flex flex-row items-center">
          <Text className="font-popmedium text-sm uppercase tracking-[0.175px]">
            En-2345sn
          </Text>
          <View className="flex flex-row items-center justify-center rounded-[2px] px-2 py-1 gap-[6px]">
            <View className="w-2 h-2 bg-black"></View>
            <Text className="font-pop uppercase text-[10px] leading-normal tracking-[0.15px]">
              Survey Registration
            </Text>
          </View>
        </View>
        <Text className="text-[10px] leading-normal font-pop text-[#808080] tracking-[0.15px]">
          23, Okpara avenue Independent L/O, Enugu
        </Text>
        <Text className="text-[10px] leading-normal font-pop uppercase tracking-[0.15px]">
          23rd Jun, 2024
        </Text>
      </View>
      <View className="flex justify-center">
        <RightCaret />
      </View>
    </TouchableOpacity>
  );
};

export default SurveyTaskCard;

const styles = StyleSheet.create({});
