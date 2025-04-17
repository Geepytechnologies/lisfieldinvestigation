import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {};

const NoRecord = (props: Props) => {
  return (
    <View className="flex-1 flex items-center justify-center">
      <View className="flex flex-col items-center gap-3">
        <FontAwesome5 name="file-alt" size={24} color="black" />
        <Text className="font-popmedium text-sm">No Record</Text>
      </View>
    </View>
  );
};

export default NoRecord;

const styles = StyleSheet.create({});
