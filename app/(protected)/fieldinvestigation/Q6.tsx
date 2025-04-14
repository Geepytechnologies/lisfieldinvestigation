import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressTab from "@/components/survey/ProgressTab";
import BottomNavigator from "@/components/survey/BottomNavigator";
import { Feather } from "@expo/vector-icons";
import RightCaret from "@/assets/svg/right-caret.svg";
import Tick from "@/assets/svg/tick.svg";
import { router } from "expo-router";
import BottomSheetPopup from "@/components/ui/BottomSheetPopup";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import SurveyQuestionBox from "@/components/survey/SurveyQuestionBox";

type Props = {};
type Item = {
  index: number;
  label: string;
};

const Q6 = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const bottomsheetRef = useRef<BottomSheetMethods>(null);
  const openSheet = () => bottomsheetRef.current?.snapToIndex(0);
  const closeSheet = () => bottomsheetRef.current?.close();

  const beacons = ["SB120/EN", "SB121/EN", "SB122/EN", "SB123/EN"];
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showBottombar, setShowBottomBar] = useState(true);

  const handleAnimation = () => {
    dropdownAnim.setValue(0);
    Animated.timing(dropdownAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const selectItem = (beacon: string, index: number) => {
    setSelectedItem({ label: beacon, index: index });
    handleAnimation();
    closeSheet();
  };

  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={6} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Answer the following questions for each beacon number as stated below.
        </Text>
      </View>

      <View className="bg-[#F0F0F0] flex-1">
        <View className="bg-white p-3 m-6 flex flex-col gap-3">
          <Text className="text-sm font-pop tracking-[0.035px]">
            Select each beacon and fill accordingly.{" "}
          </Text>

          <TouchableOpacity
            className="border-[#808080] border bg-[#F0F0F0] rounded flex flex-row items-center py-3 px-2 justify-between"
            activeOpacity={0.8}
            onPress={openSheet}
          >
            <Text className="text-xs text-[#808080] font-pop">
              Select beacon
            </Text>
            <Feather name={"chevron-down"} size={18} color="#555" />
          </TouchableOpacity>
          {selectedItem && (
            <View>
              <View className="border-b border-b-[#f0f0f0] mt-3 flex flex-col items-center gap-4">
                <View className="h-6 w-6 bg-primary rounded-full items-center justify-center flex font-popmedium">
                  <Text className="text-xl">{selectedItem.index}</Text>
                </View>
                <Text className="font-pop tracking-[0.024px]">
                  {selectedItem.label}
                </Text>
              </View>
              <View className="mt-3">
                <Text className="text-sm font-pop">
                  1. Is the beacon pilar properly erected?
                </Text>
                <View className="mt-3 flex gap-5">
                  <SurveyQuestionBox
                    value="Erected"
                    active={selectedOption === "Yes, the land exist"}
                    onPress={() => setSelectedOption("Yes, the land exist")}
                  />
                  <SurveyQuestionBox
                    value="Not Erected"
                    active={selectedOption === "No, the land doesn’t exist"}
                    onPress={() =>
                      setSelectedOption("No, the land doesn’t exist")
                    }
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {showBottombar && (
        <View className="mt-auto">
          <BottomNavigator
            actionText="Next"
            actionFunc={() => router.push("/fieldinvestigation/Q7")}
          />
        </View>
      )}

      <BottomSheetPopup ref={bottomsheetRef} snapTo={"40%"}>
        <View className="flex gap-3 mt-3">
          {beacons.map((beacon, index) => (
            <TouchableOpacity
              key={index}
              disabled={selectedItem?.label === beacon}
              onPress={() => selectItem(beacon, index + 1)}
              activeOpacity={0.95}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px]"
            >
              <Text className="text-white">{beacon}</Text>
              <View className="flex justify-center items-center rounded-full bg-[#8080801F] w-8 h-8">
                {selectedItem?.label === beacon ? (
                  <Tick />
                ) : (
                  <RightCaret fill={"white"} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetPopup>
    </SafeAreaView>
  );
};

export default Q6;

const styles = StyleSheet.create({});
