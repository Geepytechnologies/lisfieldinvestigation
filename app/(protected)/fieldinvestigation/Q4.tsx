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
import SurveyQuestionBox from "@/components/survey/SurveyQuestionBox";
import { router } from "expo-router";
import { useFormData } from "@/context/FormContext";

type Props = {};

const Q4 = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { updateForm, formData, applicantSubmission } = useFormData();
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={4} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Confirm the conformity of your measured distance between each beacon
          and what was submitted by the applicant during application?
        </Text>
      </View>
      <View className="px-6 mt-[30px] flex flex-col gap-11">
        <View className="flex flex-col gap-3">
          <Text className="font-pop">Field Investigator Submission</Text>
          <View className="w-full rounded-[6px] p-2 border border-[#F0F0F0] gap-3">
            <Text className="uppercase text-[10px] font-pop">Area of Land</Text>
            <Text className=" border-[#F0F0F0] border px-4 py-2 font-popmedium rounded text-sm leading-normal">
              {formData.verifiedLandSize ?? "N/A"}
            </Text>
          </View>
        </View>
        <View className="flex flex-col gap-3">
          <Text className="font-pop">Applicant Submission</Text>
          <View className="w-full rounded-[6px] p-2 border border-primary gap-3">
            <Text className="uppercase text-[10px] font-pop">Area of Land</Text>
            <Text className=" border-[#F0F0F0] border px-4 py-2 font-popmedium rounded text-sm leading-normal">
              {applicantSubmission}
            </Text>
          </View>
        </View>
        <View className="flex flex-col gap-11">
          <View className="">
            <SurveyQuestionBox
              value="Yes, the measurements checks out"
              active={formData.landSizeConformity == true}
              onPress={() => {
                updateForm("landSizeConformity", true);
                setSelectedOption("Yes, the measurements checks out");
              }}
            />
            <SurveyQuestionBox
              value="No, the measurements is wrong"
              active={formData.landSizeConformity === false}
              onPress={() => {
                updateForm("landSizeConformity", false);
                setSelectedOption("No, the measurements is wrong");
              }}
            />
          </View>
        </View>
      </View>
      <View className="mt-auto">
        <BottomNavigator
          actionBtnDisabled={!formData.landSizeConformity}
          actionText="Next"
          actionFunc={() => router.push("/fieldinvestigation/Q5")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Q4;

const styles = StyleSheet.create({});
