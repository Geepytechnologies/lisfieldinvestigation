import {
  Animated,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
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
import { useFormData } from "@/context/FormContext";
import { Beacon } from "@/interfaces/requests/survey.interface";
import { useUserStore } from "@/config/store";
import { useGetTasks } from "@/queries/surveyplan";
import { TextInput } from "react-native-gesture-handler";
import BeaconInput from "@/components/survey/BeaconInput";

type Props = {};
type Item = {
  label: string;
};

const Q2 = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const { tasks, refetchTasks } = useGetTasks(
    { AssignedTo: user?.staffId },
    !!user?.staffId
  );
  const bottomsheetRef = useRef<BottomSheetMethods>(null);
  const beaconsheetRef = useRef<BottomSheetMethods>(null);
  const openSheet = () => {
    bottomsheetRef.current?.snapToIndex(0);
  };
  const openBeaconSheet = () => {
    beaconsheetRef.current?.snapToIndex(0);
  };
  const [showBottombar, setShowBottomBar] = useState(false);
  const beacons = tasks?.data[0].beaconsFi ?? [];
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const [items, setItems] = useState<Item[]>([]);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [newItemAdded, setNewItemAdded] = useState<number | null>(null);
  const { formData, updateForm } = useFormData();
  const [beaconToIndex, setBeaconToIndex] = useState<number>();

  useEffect(() => {
    // Add a new animation value for the newly added item
    setAnimations((prevAnimations) => [
      ...prevAnimations,
      new Animated.Value(0),
    ]);
    if (items.length == beacons.length) {
      setShowBottomBar(true);
    }
  }, [items, tasks]);

  const handleAnimation = (index: number) => {
    if (animations[index]) {
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const addItem = (beacon: string) => {
    const newItem = { label: beacon };

    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      return newItems;
    });

    setNewItemAdded(items.length);
  };
  const checkIfLabelExists = (label: string) => {
    return items.some((item) => item.label === label);
  };
  const ordinalSuffix = (num: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;
    return (
      num +
      (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0])
    );
  };
  const getBeaconMessage = () => {
    if (items.length === 0) {
      return "Select the first beacon as observed.";
    } else {
      const beaconNumber = items.length + 1;
      if (beaconNumber > beacons.length) {
        return "Beacons complete";
      } else {
        return `Select the ${ordinalSuffix(beaconNumber)} beacon as observed.`;
      }
    }
  };
  const closeSheet = () => {
    bottomsheetRef.current?.close();
  };
  const closeBeaconSheet = () => {
    beaconsheetRef.current?.close();
  };
  const getDefaultBeacon = (index: number): Beacon => ({
    beaconNumber: "",
    cardinalDirection: "",
    longitude: 0,
    latitude: 0,
    beaconPillarProperlyErected: null,
    beaconIndex: index,
    beaconErectionStatus: "",
    verifiedDistance: 0,
    verifiedBearing: 0,
    verifiedNorthings: 0,
    verifiedEastings: 0,
    beaconNumberTo: "",
    verifiedBearingDegree: 0,
    verifiedBearingMinute: 0,
    verifiedBearingSeconds: 0,
  });

  const updateBeaconAtIndex = (
    index: number,
    updatedBeacon: Partial<Beacon>
  ) => {
    const beacons = formData.beacons || [];
    const updatedBeacons = [...beacons];

    if (updatedBeacons[index]) {
      // Merge only the provided fields into the existing beacon
      updatedBeacons[index] = {
        ...updatedBeacons[index],
        ...updatedBeacon,
      };
    } else {
      // First time it's being added — merge into default
      updatedBeacons[index] = {
        ...getDefaultBeacon(index),
        ...updatedBeacon,
      };
    }

    updateForm("beacons", updatedBeacons);
  };
  const isBeaconFilled = (beacon: Beacon): boolean => {
    return (
      beacon.beaconNumber.trim() !== "" &&
      beacon.beaconErectionStatus.trim() !== "" &&
      beacon.verifiedDistance !== null &&
      beacon.verifiedNorthings !== null &&
      beacon.verifiedEastings !== null &&
      beacon.beaconNumberTo.trim() !== "" &&
      beacon.verifiedBearingDegree !== null &&
      beacon.verifiedBearingMinute !== null &&
      beacon.verifiedBearingSeconds !== null
    );
  };

  const areAllBeaconsFilled = (): boolean => {
    if (!formData.beacons || formData.beacons.length === 0) return false;
    return formData.beacons.every(isBeaconFilled);
  };

  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="">
          <View>
            <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
              <ProgressTab tab={2} />
              <Text className="font-popmedium text-sm tracking-[0.014px]">
                Beacon index: Select the order as seen in the field.
              </Text>
            </View>
            <View className="bg-[#F0F0F0] flex-1">
              <View className="bg-white p-3 m-6 flex flex-col gap-3">
                {items.map((item, index) => (
                  <BeaconInput
                    key={index}
                    index={index}
                    label={item.label}
                    beacon={
                      formData.beacons?.[index] || getDefaultBeacon(index)
                    }
                    updateBeacon={updateBeaconAtIndex}
                    openBeaconSheet={openBeaconSheet}
                    setBeaconToIndex={setBeaconToIndex}
                  />
                ))}
                <Text className="text-sm font-pop tracking-[0.035px] mt-11">
                  {getBeaconMessage()}
                </Text>

                {!(items.length + 1 > beacons.length) && (
                  <TouchableOpacity
                    className="border-[#808080] border bg-[#F0F0F0] rounded flex flex-row items-center py-3 px-2 justify-between mb-10"
                    activeOpacity={0.9}
                    onPress={openSheet}
                  >
                    <Text className="text-xs text-[#808080] font-pop">
                      Select beacon
                    </Text>
                    <Feather name={"chevron-down"} size={18} color="#555" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        {showBottombar && (
          <View className="mt-auto">
            <BottomNavigator
              actionBtnDisabled={!areAllBeaconsFilled()}
              actionText="Next"
              actionFunc={() => router.push("/fieldinvestigation/Q2B")}
            />
          </View>
        )}
      </KeyboardAvoidingView>

      <BottomSheetPopup ref={bottomsheetRef} snapTo={["40%", "90%"]}>
        <View className="flex gap-3 mt-3">
          {beacons.map((beacon, index) => {
            const parsedbeacon = JSON.parse(beacon);
            return (
              <TouchableOpacity
                disabled={checkIfLabelExists(beacon)}
                key={index}
                activeOpacity={0.95}
                onPress={() => {
                  addItem(parsedbeacon.beacon_number);
                  updateBeaconAtIndex(index, {
                    beaconIndex: index + 1,
                    beaconNumber: parsedbeacon.beacon_number,
                  });
                  closeSheet();
                }}
                className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
              >
                <Text className="text-white">{parsedbeacon.beacon_number}</Text>
                <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                  {!checkIfLabelExists(parsedbeacon.beacon_number) ? (
                    <RightCaret fill={"white"} />
                  ) : (
                    <Tick />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetPopup>
      <BottomSheetPopup ref={beaconsheetRef} snapTo={["50%", "90%"]}>
        <View className="flex gap-3 mt-3">
          {[...beacons, JSON.stringify({ beacon_number: "None" })].map(
            (beacon, index) => {
              const parsedBeacon = JSON.parse(beacon);

              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.95}
                  onPress={() => {
                    updateBeaconAtIndex(beaconToIndex as number, {
                      beaconNumberTo: parsedBeacon.beacon_number,
                    });
                    closeBeaconSheet();
                  }}
                  className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
                >
                  <Text className="text-white uppercase flex-1">
                    {parsedBeacon.beacon_number === "None"
                      ? "No more beacons"
                      : parsedBeacon.beacon_number}
                  </Text>
                  <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                    <RightCaret fill={"white"} />
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </BottomSheetPopup>
    </SafeAreaView>
  );
};

export default Q2;

const styles = StyleSheet.create({});
