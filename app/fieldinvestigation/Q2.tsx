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

type Props = {};
type Item = {
  label: string;
};

const Q2 = (props: Props) => {
  const bottomsheetRef = useRef<BottomSheetMethods>(null);
  const openSheet = () => {
    bottomsheetRef.current?.snapToIndex(0);
  };
  const [showBottombar, setShowBottomBar] = useState(false);
  const beacons = ["SB120/EN", "SB121/EN", "SB122/EN", "SB123/EN"];
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const [items, setItems] = useState<Item[]>([]);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [newItemAdded, setNewItemAdded] = useState<number | null>(null);
  useEffect(() => {
    // Add a new animation value for the newly added item
    setAnimations((prevAnimations) => [
      ...prevAnimations,
      new Animated.Value(0),
    ]);
    if (items.length == beacons.length) {
      setShowBottomBar(true);
    }
  }, [items]);

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

    // Add the new item to the list and trigger animation for it
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      return newItems;
    });

    // Set the index of the newly added item to trigger its animation
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
  return (
    <SafeAreaView className="bg-white py-2" style={{ flex: 1 }}>
      <View className="flex gap-6 py-3 px-6 border-b-[#F0F0F0] border-b">
        <ProgressTab tab={2} />
        <Text className="font-popmedium text-sm tracking-[0.014px]">
          Beacon index: Select the order as seen in the field.
        </Text>
      </View>
      <View className="bg-[#F0F0F0] flex-1">
        <View className="bg-white p-3 m-6 flex flex-col gap-3">
          {items.map((item, index) => (
            <Animated.View
              key={index}
              style={{
                height: animations[index]?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 70],
                }),
                overflow: "hidden",
              }}
              onLayout={() => {
                if (newItemAdded === index) {
                  handleAnimation(index);
                }
              }}
            >
              <View
                key={index}
                className="border-b border-b-[#f0f0f0] mt-3 flex flex-col items-center gap-4 "
              >
                <View className="h-6 w-6 bg-primary rounded-full items-center justify-center flex font-popmedium">
                  <Text className="text-xl">{index + 1}</Text>
                </View>
                <Text className="font-pop tracking-[0.024px]">
                  {item.label}
                </Text>
              </View>
            </Animated.View>
          ))}
          <Text className="text-sm font-pop tracking-[0.035px]">
            {getBeaconMessage()}
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
        </View>
      </View>
      {showBottombar && (
        <View className="mt-auto">
          <BottomNavigator
            actionText="Next"
            actionFunc={() => router.push("/fieldinvestigation/Q2B")}
          />
        </View>
      )}

      <BottomSheetPopup ref={bottomsheetRef} snapTo={"40%"}>
        <View className="flex gap-3 mt-3">
          {beacons.map((beacon, index) => (
            <TouchableOpacity
              disabled={checkIfLabelExists(beacon)}
              key={index}
              activeOpacity={0.95}
              onPress={() => {
                addItem(beacon);
                closeSheet();
              }}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">{beacon}</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                {!checkIfLabelExists(beacon) ? (
                  <RightCaret fill={"white"} />
                ) : (
                  <Tick />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetPopup>
    </SafeAreaView>
  );
};

export default Q2;

const styles = StyleSheet.create({});
