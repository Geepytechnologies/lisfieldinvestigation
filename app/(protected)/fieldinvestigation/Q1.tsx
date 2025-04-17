import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import SurveyQuestionBox from "@/components/survey/SurveyQuestionBox";
import { router, useRouter } from "expo-router";
import { useFormData } from "@/context/FormContext";

type Props = {};

const Q1 = (props: Props) => {
  const router = useRouter();
  const { formData, updateForm } = useFormData();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={1} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Field Investigation Starts - Utmost Attention is Required Here!
        </Text>
        <Text className="font-pop tracking-[0.035px] text-sm ">
          Confirm physical presence of Land.
        </Text>
      </View>
      <View className="px-6 mt-[30px] flex gap-5">
        <SurveyQuestionBox
          value="Yes, the land exist"
          active={formData.landExistence as boolean}
          onPress={() => updateForm("landExistence", true)}
        />
        <SurveyQuestionBox
          value="No, the land doesn’t exist"
          active={formData.landExistence == false}
          onPress={() => updateForm("landExistence", false)}
        />
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionBtnDisabled={formData.landExistence == null}
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q2")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q1;

const styles = StyleSheet.create({});
