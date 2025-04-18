// components/survey/BeaconInput.tsx
import React, { memo, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import SurveyQuestionBox from "./SurveyQuestionBox"; // adjust path if needed
import { Beacon } from "@/interfaces/requests/survey.interface";
import { Feather } from "@expo/vector-icons";
import { useFormData } from "@/context/FormContext";
import NumericInput from "../ui/NumericInput";

interface Props {
  index: number;
  label: string;
  beacon: Beacon;
  updateBeacon: (index: number, updatedBeacon: Partial<Beacon>) => void;
  openBeaconSheet: () => void;
  setBeaconToIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const BeaconInput = ({
  index,
  label,
  beacon,
  updateBeacon,
  openBeaconSheet,
  setBeaconToIndex,
}: Props) => {
  const handleChange = useCallback(
    (field: keyof Beacon, value: string | number) => {
      updateBeacon(index, { [field]: value });
    },
    [index, updateBeacon]
  );
  const { formData } = useFormData();
  return (
    <View className="mt-3 flex flex-col items-center gap-4">
      <View className="flex flex-col items-center border-b border-b-[#f0f0f0] w-full">
        <View className="h-6 w-6 bg-primary rounded-full items-center justify-center flex font-popmedium">
          <Text className="text-xl">{index + 1}</Text>
        </View>
        <Text className="font-pop tracking-[0.024px] mt-2">{label}</Text>
      </View>
      <View className="">
        {/* Question 1 */}
        <View className="mt-3">
          <Text className="text-sm font-pop">
            1. Is the beacon pillar properly erected?
          </Text>
          <View className="mt-3 flex gap-5">
            <SurveyQuestionBox
              value="Erected"
              active={beacon?.beaconErectionStatus === "Erected"}
              onPress={() => handleChange("beaconErectionStatus", "Erected")}
            />
            <SurveyQuestionBox
              value="Not Erected"
              active={beacon?.beaconErectionStatus === "Not Erected"}
              onPress={() =>
                handleChange("beaconErectionStatus", "Not Erected")
              }
            />
          </View>
        </View>

        {/* Question 2 */}
        <View className="mt-11 flex gap-3">
          <Text className="text-sm font-pop">
            2. Provide the measured bearing and distance.
          </Text>
          <View className="flex flex-row gap-6">
            <View className="bg-[#F0F0F0] border border-primary w-[80px] rounded p-2 min-h-11">
              <Text
                style={{ textAlign: "right" }}
                className="font-pop text-[10px]"
              >
                o
              </Text>

              <NumericInput
                onValueChange={(val) =>
                  handleChange("verifiedBearingDegree", val as number)
                }
              />
            </View>
            <View className="bg-[#F0F0F0] border border-primary w-[80px] rounded p-2 min-h-11">
              <Text
                style={{ textAlign: "right" }}
                className="font-pop text-[10px]"
              >
                ‘
              </Text>

              <NumericInput
                onValueChange={(val) =>
                  handleChange("verifiedBearingMinute", val as number)
                }
              />
            </View>
            <View className="bg-[#F0F0F0] border border-primary w-[80px] rounded p-2 min-h-11">
              <Text
                style={{ textAlign: "right" }}
                className="font-pop text-[10px]"
              >
                “
              </Text>

              <NumericInput
                onValueChange={(val) =>
                  handleChange("verifiedBearingSeconds", val as number)
                }
              />
            </View>
          </View>

          <View className="bg-[#F0F0F0] border border-primary min-w-[80px] rounded p-2 min-h-11">
            <NumericInput
              placeholder="Enter distance in meters "
              onValueChange={(val) =>
                handleChange("verifiedDistance", val as number)
              }
            />
          </View>
        </View>

        {/* Question 3 */}
        <View className="mt-11 flex gap-3">
          <Text className="text-sm font-pop">
            3. Record the beacon Northings and Eastings.
          </Text>
          <View className="flex flex-row items-center gap-6">
            <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
              <Text className="text-[10px] uppercase leading-normal">
                Northings
              </Text>

              <NumericInput
                onValueChange={(val) =>
                  handleChange("verifiedNorthings", val as number)
                }
              />
            </View>
            <View className="bg-[#f0f0f0] flex-1 flex flex-col justify-center gap-3 py-2 px-3 rounded-[12px]">
              <Text className="text-[10px] uppercase leading-normal">
                Eastings
              </Text>

              <NumericInput
                onValueChange={(val) =>
                  handleChange("verifiedEastings", val as number)
                }
              />
            </View>
          </View>
        </View>

        {/* Question 4 */}
        <View className="mt-11 flex gap-3">
          <Text className="text-sm font-pop">4. Select beacon to</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              openBeaconSheet();
              setBeaconToIndex(index);
            }}
            className="bg-[#F0F0F0] border flex flex-row items-center justify-between border-primary min-w-[80px] rounded p-2 min-h-11"
          >
            <Text>{beacon.beaconNumberTo ?? "N/A"}</Text>
            <Feather name={"chevron-down"} size={18} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(BeaconInput);
