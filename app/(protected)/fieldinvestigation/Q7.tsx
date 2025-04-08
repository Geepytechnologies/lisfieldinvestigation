import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { router } from "expo-router";

type Props = {};

const Q7 = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={7} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Any field investigation remark?
        </Text>
      </View>
      <View className="px-6 items-center justify-center flex gap-5 flex-1 ">
        <TextInput
          keyboardType="default"
          placeholder="Remark"
          numberOfLines={10}
          multiline
          textAlignVertical="top"
          className="text-wrap border-[#F6F6F6] border rounded-lg text-[#808080] text-sm leading-normal px-3 py-2 w-full min-h-[300px]"
        />
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q7B")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q7;

const styles = StyleSheet.create({});
