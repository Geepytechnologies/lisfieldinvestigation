import {
  Image,
  StyleSheet,
  Platform,
  ImageBackground,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Avatar from "@/assets/svg/avatar.svg";
import Profile from "@/assets/svg/profile.svg";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, router } from "expo-router";
import { formatDate, getGreeting } from "@/utils/DateFormatter";
import { useUserStore } from "@/config/store";
import { useGetTasks } from "@/queries/surveyplan";

export default function HomeScreen() {
  const { user } = useUserStore((state) => state);
  const { tasks: assignedTasks } = useGetTasks(
    { AssignedTo: user?.staffId, AssignmentStatus: "Assigned" },
    !!user?.staffId
  );
  const { tasks: pendingTasks } = useGetTasks(
    { AssignedTo: user?.staffId, AssignmentStatus: "Accepted" },
    !!user?.staffId
  );
  const { tasks: completedTasks } = useGetTasks(
    {
      AssignedTo: user?.staffId,
      InvestigationStatus: "Field Investigation Completed",
    },
    !!user?.staffId
  );
  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      source={require("@/assets/images/spiralbackground.jpg")}
    >
      <View className="" style={styles.overlay}></View>
      <SafeAreaView className="w-full" style={[{ flex: 1 }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View className="mt-[10px] flex items-center">
            <Image
              className="w-11 h-11 rounded-full"
              resizeMode="cover"
              source={require("@/assets/images/stateicon.png")}
            />
          </View>
          <View className="p-3">
            <Text className="text-[#808080] text-sm font-pop">
              {getGreeting()}
            </Text>
            <View className="flex flex-row justify-between">
              <Text className="font-popmedium text-xl">
                {user?.firstName + " " + user?.lastName}
              </Text>
              <Text className="text-[10px] font-pop uppercase">
                {formatDate(new Date())}
              </Text>
            </View>
          </View>
          {/* role */}
          <View className="bg-white py-2 px-3 mt-11 flex flex-row items-center justify-between">
            <View className="flex flex-row gap-1 items-center">
              <Avatar />
              <Text className="text-xs font-pop tracking-[0.048px] leading-normal">
                {user?.firstName + " " + user?.lastName}
              </Text>
            </View>
            <View className="rounded-[360px] py-2 px-3 bg-black flex flex-row items-center gap-2">
              <Profile />
              <Text className="text-white uppercase font-pop text-[10px] tracking-[0.15px]">
                Field Investigator
              </Text>
            </View>
          </View>
          {/* assigned Task */}
          <TouchableOpacity
            onPress={() => router.push("/(protected)/tasks/assignedtasks")}
            activeOpacity={0.9}
            className="p-3 mt-3 flex gap-3 bg-white"
          >
            <View className="flex flex-row items-center gap-1">
              <View className="bg-[#2B58DA] w-4 h-4 rounded"></View>
              <Text className="font-pop text-sm tracking-[0.035px] leading-normal">
                Assigned Task
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex">
                <Text className="font-poly text-[96px] leading-normal">
                  {assignedTasks?.data.length}
                </Text>
                <Text>Task Left</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-[#808080] text-sm">13th Jun.</Text>
                <View className="bg-black w-6 h-6 rounded-full items-center justify-center flex">
                  <FontAwesome6 name="angle-right" size={12} color="white" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* pending Task */}
          <TouchableOpacity
            onPress={() => router.push("/(protected)/tasks/pendingtasks")}
            activeOpacity={0.9}
            className="p-3 mt-3 flex gap-3 bg-white"
          >
            <View className="flex flex-row items-center gap-1">
              <View className="bg-red-500 w-4 h-4 rounded"></View>
              <Text className="font-pop text-sm tracking-[0.035px] leading-normal">
                Pending Task
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex">
                <Text className="font-poly text-[96px] leading-normal">
                  {" "}
                  {pendingTasks?.data.length}
                </Text>
                <Text>Task Left</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-[#808080] text-sm">13th Jun.</Text>
                <View className="bg-black w-6 h-6 rounded-full items-center justify-center flex">
                  <FontAwesome6 name="angle-right" size={12} color="white" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          {/* completed Task */}
          <TouchableOpacity
            onPress={() => router.push("/(protected)/tasks/completedtasks")}
            activeOpacity={0.9}
            className="p-3 mt-3 flex gap-3 bg-white"
          >
            <View className="flex flex-row items-center gap-1">
              <View className=" bg-[#1FD951] w-4 h-4 rounded"></View>
              <Text className="font-pop text-sm tracking-[0.035px] leading-normal">
                Completed Task
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <View className="flex">
                <Text className="font-poly text-[96px] leading-normal">
                  {completedTasks?.data.length}
                </Text>
                <Text>Task Left</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-[#808080] text-sm">13th Jun.</Text>
                <View className="bg-black w-6 h-6 rounded-full items-center justify-center flex">
                  <FontAwesome6 name="angle-right" size={12} color="white" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImageStyle: {
    opacity: 0.5,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f2f3f8",
    opacity: 0.5,
  },
});
