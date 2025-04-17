import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { router } from "expo-router";
import { useFormData } from "@/context/FormContext";

type Props = {};

const Q2B = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { formData, updateForm } = useFormData();
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={2} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Based on what you see, how many beacons is present on the land?
        </Text>
      </View>
      <View className="px-6 items-center justify-center flex gap-5 flex-1">
        <View className="w-full">
          <TextInput
            onChangeText={(text) => updateForm("numberOfBeacons", Number(text))}
            keyboardType="numeric"
            placeholder="ANSWER"
            className="border border-[#808080] rounded-lg text-[#808080] text-[10px] leading-normal px-3"
          />
        </View>
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionBtnDisabled={!formData.numberOfBeacons}
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q3")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q2B;

const styles = StyleSheet.create({});
