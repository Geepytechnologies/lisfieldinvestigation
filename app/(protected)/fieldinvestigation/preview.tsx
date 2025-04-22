import {
  ScrollView,
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
import { router } from "expo-router";
import QuestionPreview from "@/components/survey/QuestionPreview";
import { useFormData } from "@/context/FormContext";
import SurveyQuestionBox from "@/components/survey/SurveyQuestionBox";
import { useGetTasks, useLandInvestigation } from "@/queries/surveyplan";
import Loader from "@/components/ui/Loader";
import { useNotification } from "@/context/NotificationContext";
import { useUserStore } from "@/config/store";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

type Props = {};

const Preview = (props: Props) => {
  const { notify } = useNotification();
  const { user } = useUserStore((state) => state);
  const { id } = useLocalSearchParams();
  const {
    tasks: completedTasks,
    refetchTasks,
    fetchingTasks,
  } = useGetTasks({ SurveyPlanNumber: id as string }, !!id);

  const formData = completedTasks?.data[0];
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View className="flex flex-row mx-2">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.9}
            className="bg-black gap-3 flex flex-row items-center px-3 py-[10px] rounded-[100px] "
          >
            <Feather className="" name="arrow-left" size={24} color="white" />
            <Text className="text-[10px] text-white font-pop leading-normal tracking-[0.15px]">
              BACK
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex gap-3 py-3 px-6 border-b-[#F0F0F0] border-b mb-6">
          <Text className="font-popmedium text-xl text-center tracking-[0.014px]">
            Preview
          </Text>
          <Text>
            Preview what has been inputted so as to confirm the information
            provided.
          </Text>
        </View>
        <View className="px-6 flex gap-3 flex-1 ">
          <QuestionPreview
            index={1}
            question={"Confirm physical presence of Land."}
            answer={
              formData?.landExistence
                ? "Yes, the land exist"
                : formData?.landExistence == false
                ? "No, the land doesn’t exist"
                : "N/A"
            }
          />
          <QuestionPreview
            index={2}
            question={
              "Based on what you see, how many beacons is present on the land?"
            }
            answer={String(formData?.verifiedNumberOfBeacons) ?? "N/A"}
          />
          <QuestionPreview
            index={3}
            question={
              "Verify the size of land: measure the distances between each beacon, in meters, and calculate the area in square meters."
            }
            answer={String(formData?.verifiedLandSize) ?? "N/A"}
          />
          <QuestionPreview
            index={4}
            question={
              "Confirm the conformity of your measured distance between each beacon and what was submitted by the applicant during application?"
            }
            answer={
              formData?.landSizeConformity
                ? "Yes, the measurement checks out"
                : formData?.landSizeConformity == false
                ? "No, the measurement is wrong"
                : "N/A"
            }
          />
          <QuestionPreview
            hasChildren={true}
            index={5}
            question={
              "Get the coordinate of the centre point of land. Stand in the approximate centre point and click the capture button."
            }
          >
            <View className="flex flex-row items-center gap-6">
              <View className="bg-[#f0f0f0] min-w-[120px] flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
                <Text className="text-[10px] uppercase leading-normal">
                  Longitude
                </Text>
                <Text className="">{formData?.longitude || "N/A"}</Text>
              </View>
              <View className="bg-[#f0f0f0] min-w-[120px] flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
                <Text className="text-[10px] uppercase leading-normal">
                  Latitude
                </Text>
                <Text className="">{formData?.latitude || "N/A"}</Text>
              </View>
            </View>
          </QuestionPreview>
          <QuestionPreview
            hasChildren={true}
            index={6}
            question={
              "Answer the following questions for each beacon number as stated below."
            }
          >
            {formData?.beaconsFi.map((item, index) => {
              const parsedBeacon = JSON.parse(item);
              return (
                <View key={index}>
                  <View
                    key={index}
                    className=" mt-3 flex flex-col items-center gap-4 "
                  >
                    <View className="flex flex-col items-center border-b border-b-[#f0f0f0] w-full">
                      <View className="h-6 w-6  bg-primary rounded-full items-center justify-center flex font-popmedium">
                        <Text className="text-xl">{index + 1}</Text>
                      </View>
                      <Text className="font-pop tracking-[0.024px] mt-2">
                        {parsedBeacon.beacon_number}
                      </Text>
                    </View>
                    <View>
                      <View className="mt-3">
                        <Text className="text-sm font-pop">
                          1. Is the beacon pilar properly erected?
                        </Text>
                        <View className="mt-3 flex gap-5">
                          <SurveyQuestionBox
                            value="Erected"
                            active={parsedBeacon?.erection_status === "Erected"}
                            onPress={() => {}}
                          />
                          <SurveyQuestionBox
                            value="Not Erected"
                            active={
                              parsedBeacon?.erection_status === "Not Erected"
                            }
                            onPress={() => {}}
                          />
                        </View>
                      </View>
                      <View className="mt-11 flex gap-3">
                        <Text className="text-sm font-pop">
                          2. Provide the measured bearing and distance.
                        </Text>
                        <View className="flex flex-row gap-6">
                          <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
                            <Text
                              style={{ textAlign: "right" }}
                              className="font-pop text-[10px]"
                            >
                              o
                            </Text>

                            <Text>{parsedBeacon.verified_bearing_degree}</Text>
                          </View>
                          <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
                            <Text
                              style={{ textAlign: "right" }}
                              className="font-pop text-[10px]"
                            >
                              ‘
                            </Text>
                            <Text>{parsedBeacon.verified_bearing_minute}</Text>
                          </View>
                          <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
                            <Text
                              style={{ textAlign: "right" }}
                              className="font-pop text-[10px]"
                            >
                              “
                            </Text>
                            <Text>{parsedBeacon.verified_bearing_seconds}</Text>
                          </View>
                        </View>
                        <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
                          <Text>{parsedBeacon.verified_distance}</Text>
                        </View>
                      </View>
                      <View className="mt-11 flex gap-3">
                        <Text className="text-sm font-pop">
                          3. Record the beacon Northings and Eastings.
                        </Text>
                        <View className="flex flex-row items-center gap-6">
                          <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
                            <Text className="text-[10px] uppercase leading-normal">
                              Northings
                            </Text>
                            <Text>{parsedBeacon.verified_northings}</Text>
                          </View>
                          <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
                            <Text className="text-[10px] uppercase leading-normal">
                              Eastings
                            </Text>
                            <Text>{parsedBeacon.verified_eastings}</Text>
                          </View>
                        </View>
                      </View>
                      <View className="mt-11 flex gap-3">
                        <Text className="text-sm font-pop">
                          4. Input beacon to
                        </Text>
                        <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
                          <Text>{parsedBeacon.beacon_number_to}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </QuestionPreview>
          <QuestionPreview
            index={7}
            question={"Any field investigation remark?"}
            answer={String(formData?.investigationRemark) ?? "N/A"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Preview;

const styles = StyleSheet.create({});
