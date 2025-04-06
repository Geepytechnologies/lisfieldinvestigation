import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  label: string;
  value: string;
  extravalue?: string;
  showExtraValue?: boolean;
};

const SurveyDetailRow = ({
  label,
  value,
  showExtraValue = false,
  extravalue,
}: Props) => {
  return (
    <View className="flex flex-row gap-5 items-center justify-between py-2 border-b border-b-[#F0F0F0] w-full">
      <Text className="text-[10px] font-pop leading-normal tracking-[0.15px] uppercase w-[80px]">
        {label}
      </Text>
      <View className="flex flex-row items-center gap-3 flex-1">
        <Text className="text-sm font-pop tracking-[0.035px] flex-shrink">
          {value}
        </Text>
        {showExtraValue && (
          <View className=" border-[#1E83F0] border rounded">
            <Text className="uppercase text-[#1E83F0]">{extravalue}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SurveyDetailRow;

const styles = StyleSheet.create({});
