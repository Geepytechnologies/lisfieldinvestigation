import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { router } from "expo-router";
import { useFormData } from "@/context/FormContext";
import NumericInput from "@/components/ui/NumericInput";

type Props = {};

const Q3 = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { formData, updateForm } = useFormData();

  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={3} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Verify the size of land: measure the distances between each beacon, in
          meters, and calculate the area in square meters.
        </Text>
      </View>
      <View className="px-6 items-center justify-center flex gap-5 flex-1 ">
        <View className="w-full rounded-[6px] p-2 border border-[#F0F0F0] gap-3">
          <Text className="uppercase text-[10px] font-pop">Area of Land</Text>

          <NumericInput
            onValueChange={(val) => updateForm("verifiedLandSize", val)}
            placeholder="Enter area of land "
            className=" bg-[#F0F0F0] rounded text-[#808080] text-sm leading-normal px-3"
          />
        </View>
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionBtnDisabled={!formData.verifiedLandSize}
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q4")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q3;

const styles = StyleSheet.create({});
