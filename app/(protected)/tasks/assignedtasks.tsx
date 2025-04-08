import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Filter from "@/assets/svg/filter.svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import SurveyTaskCard from "@/components/survey/SurveyTaskCard";
import { router } from "expo-router";

type Props = {};

const Assignedtasks = (props: Props) => {
  const data = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
    { id: "4", name: "Diana" },
    { id: "5", name: "Edward" },
  ];
  return (
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
          <Text className="font-pop">Assigned Task</Text>
        </View>
        <View className="flex flex-row items-center gap-8">
          <AntDesign name="search1" size={24} color="black" />
          <Filter />
        </View>
      </View>
      {/* main */}
      <FlatList data={data} renderItem={SurveyTaskCard} />
    </SafeAreaView>
  );
};

export default Assignedtasks;

const styles = StyleSheet.create({});
