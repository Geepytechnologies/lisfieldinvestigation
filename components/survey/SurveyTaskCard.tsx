import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import RightCaret from "@/assets/svg/right-caret.svg";
import { router } from "expo-router";
import { ISurveyDetails } from "@/interfaces/responses/survey.interface";
import { formatDate } from "@/utils/DateFormatter";

type Props = {
  item: ISurveyDetails;
  onSelect: () => void;
};

const SurveyTaskCard = ({ item, onSelect }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      className="flex flex-row justify-between py-3"
    >
      <View className="">
        <View className="flex flex-row items-center">
          <Text className="font-popmedium text-sm uppercase tracking-[0.175px]">
            {item.surveyPlanNumber}
          </Text>
          <View className="flex flex-row items-center justify-center rounded-[2px] px-2 py-1 gap-[6px]">
            <View className="w-2 h-2 bg-black"></View>
            <Text className="font-pop uppercase text-[10px] leading-normal tracking-[0.15px]">
              Survey Registration
            </Text>
          </View>
        </View>
        <Text className="text-[10px] leading-normal font-pop text-[#808080] tracking-[0.15px]">
          {item.address}
        </Text>
        <Text className="text-[10px] leading-normal font-pop uppercase tracking-[0.15px]">
          {formatDate(new Date(item?.assignedOn)) ?? "N/A"}
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
