import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import RightCaret from "@/assets/svg/right-caret.svg";
import SurveyDetailRow from "@/components/survey/SurveyDetailRow";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CloseIcon from "@/assets/svg/close.svg";

type Props = {};

const Assignedtask = (props: Props) => {
  const bottomsheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%"], []);
  //   const snapPoints = ["25%", "50%"];
  const openSheet = () => {
    bottomsheetRef.current?.snapToIndex(0);
  };
  const closeSheet = () => {
    bottomsheetRef.current?.close();
  };
  return (
    <SafeAreaView className="p-3 bg-white" style={{ flex: 1 }}>
      <View className="flex flex-row">
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
      <Text className="bg-[#C8E4FF] text-[10px]font-pop leading-normal tracking-[0.15px] px-3 py-4 rounded-[8px] mt-10">
        TASK
      </Text>
      {/* details */}
      <View className="my-2">
        <SurveyDetailRow
          label={"Surveyor"}
          value={"Ugochukwu Martins"}
          showExtraValue={true}
          extravalue="sn/2334/en"
        />
        <SurveyDetailRow label={"Survey Plan Number"} value={"En-2345sn"} />
        <SurveyDetailRow label={"Survey Date"} value={"23rd Sep. 2024"} />
        <SurveyDetailRow
          label={"Land Address"}
          value={"2, Independent L/O, Enugu"}
        />
        <SurveyDetailRow
          label={"Land Description"}
          value={
            "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large."
          }
        />
        <SurveyDetailRow label={"Cadastral Zone"} value={"Zone A"} />
        <SurveyDetailRow label={"LGA"} value={"Enugu East"} />
        <SurveyDetailRow label={"Land Owner"} value={"Johnson Samson"} />
      </View>
      {/* button */}
      <View className="mt-auto">
        <TouchableOpacity activeOpacity={0.9} onPress={openSheet}>
          <LinearGradient
            colors={["#1E83F0", "#000000"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.button}
          >
            <Text className="font-popmedium text-sm uppercase text-white text-center flex-1">
              Action
            </Text>
            <View className="flex justify-center">
              <RightCaret fill={"white"} stroke={"white"} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <BottomSheet
        index={-1}
        ref={bottomsheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={null}
      >
        <BottomSheetView className="bg-black flex-1 p-3 rounded-t-[24px]">
          <View className="flex flex-row justify-between items-center mt-5">
            <Text className="text-white font-popmedium text-xl">Action</Text>
            <CloseIcon onPress={closeSheet} />
          </View>
          <View className="flex gap-3 mt-3">
            <View className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px]">
              <Text className="text-white">Navigate To</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </View>
            <View className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px]">
              <Text className="text-white">View On Map</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => router.push("/fieldinvestigation/Q1")}
              className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
            >
              <Text className="text-white">Start Field Investigation</Text>
              <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                <RightCaret fill={"white"} />
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Assignedtask;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
