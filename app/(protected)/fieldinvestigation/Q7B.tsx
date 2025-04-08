import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { router } from "expo-router";

type Props = {};

const Q7B = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-3 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={7} />
        <Text className="font-popmedium text-xl text-center tracking-[0.014px]">
          Preview
        </Text>
        <Text>
          Preview what has been inputted so as to confirm the information
          provided.
        </Text>
      </View>
      <View className="px-6 items-center justify-center flex gap-5 flex-1 "></View>
      <View className="mt-auto">
        <BottomNavigator
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/finish")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q7B;

const styles = StyleSheet.create({});
