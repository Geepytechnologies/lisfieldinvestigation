import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  tab: number;
};

const ProgressTab = ({ tab }: Props) => {
  const tabs = Array.from({ length: 7 }, (_, i) => i + 1);
  return (
    <View className="flex items-center justify-center">
      <View className="flex flex-row gap-2">
        {tabs.map((_, index) => (
          <View
            key={index}
            className={`${
              tab >= index + 1 ? "bg-primary" : "bg-[#F6F6F6]"
            } h-2 w-[38px] rounded-md`}
          ></View>
        ))}
      </View>
    </View>
  );
};

export default ProgressTab;

const styles = StyleSheet.create({});
