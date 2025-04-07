import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Thumb from "@/assets/svg/thumbsup.svg";

type Props = {};

const Finish = (props: Props) => {
  return (
    <SafeAreaView className="bg-white px-6" style={{ flex: 1 }}>
      <Text className="font-popmedium text-[32px] text-center leading-[147%] w-[312px] mt-[80px]">
        Field Investigation Submitted<Text className="text-primary">!</Text>
      </Text>
      <View className="flex items-center justify-center mt-[100px]">
        <Thumb />
      </View>
    </SafeAreaView>
  );
};

export default Finish;

const styles = StyleSheet.create({});
