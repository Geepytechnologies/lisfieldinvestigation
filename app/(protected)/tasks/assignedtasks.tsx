import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Filter from "@/assets/svg/filter.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import SurveyTaskCard from "@/components/survey/SurveyTaskCard";
import { router } from "expo-router";
import { useUserStore } from "@/config/store";
import { useGetTasks } from "@/queries/surveyplan";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheetPopup from "@/components/ui/BottomSheetPopup";
import RightCaret from "@/assets/svg/right-caret.svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {};

const Assignedtasks = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const { tasks } = useGetTasks(
    { AssignedTo: user?.staffId, AssignmentStatus: "Assigned" },
    !!user?.staffId
  );

  const filterSheetRef = useRef<BottomSheetMethods>(null);

  const openFilterSheet = () => {
    filterSheetRef.current?.snapToIndex(0);
  };
  const closeFilterSheet = () => {
    filterSheetRef.current?.close();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="px-3 py-4 bg-white" style={{ flex: 1 }}>
        {/* header */}
        <View className="flex flex-row justify-between">
          <View className="flex flex-row gap-6">
            <Feather
              onPress={() => router.back()}
              className="border rounded-full border-[#f0f0f0]"
              name="arrow-left"
              size={24}
              color="black"
            />
            <Text className="font-pop">Assigned Tasks</Text>
          </View>
          <View className="flex flex-row items-center gap-8">
            <AntDesign name="search1" size={24} color="black" />
            <TouchableOpacity activeOpacity={0.8} onPress={openFilterSheet}>
              <Filter />
            </TouchableOpacity>
          </View>
        </View>
        {/* main */}
        <FlatList data={tasks?.data} renderItem={SurveyTaskCard} />
        <BottomSheetPopup ref={filterSheetRef} label="Filter By" snapTo={"40%"}>
          <View className="flex gap-3 mt-3">
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {}}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">Earliest date</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {}}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">Latest date</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {}}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">Ascending</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {}}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">Descending</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetPopup>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Assignedtasks;

const styles = StyleSheet.create({});
