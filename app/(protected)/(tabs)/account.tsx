import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/assets/svg/avatar.svg";
import Profile from "@/assets/svg/profile.svg";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/config/store";
import { AntDesign } from "@expo/vector-icons";
import { logout } from "@/services/auth";
import { router } from "expo-router";

type Props = {};

const Account = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const handleLogout = async () => {
    router.push("/(auth)/signin");
    await logout();
  };
  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      source={require("@/assets/images/spiralbackground.jpg")}
    >
      <View className="" style={styles.overlay}></View>
      <SafeAreaView className="w-full" style={[{ flex: 1 }]}>
        <ScrollView showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          <View className="mt-[10px] flex items-center">
            <Text className="font-popmedium text-2xl">Account</Text>
          </View>

          {/* role */}
          <View className="bg-white py-2 px-3 mt-11 flex flex-col items-center justify-between">
            <View className="flex flex-col gap-1 items-center">
              <Image
                className="w-[150px] h-[150px] rounded-full"
                resizeMode="cover"
                source={{ uri: user?.staffImage }}
              />
              <Text className="text-xs font-pop tracking-[0.048px] leading-normal">
                {user?.firstName + " " + user?.lastName}
              </Text>
            </View>
            <View className="rounded-[360px] mt-2 py-2 px-3 bg-black flex flex-row items-center gap-2">
              <Profile />
              <Text className="text-white uppercase font-pop text-[10px] tracking-[0.15px]">
                Field Investigator
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View className="bg-white py-8 px-3 mt-11 flex flex-col items-center justify-between">
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.9}
              className="flex flex-row gap-2 items-center"
            >
              <AntDesign name="logout" size={24} color="red" />
              <Text className="text-[red] font-popmedium">Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="dark" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Account;

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
