import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import Loader from "../ui/Loader";

type Props = {
  actionText: string;
  actionFunc?: () => void;
  actionBtnDisabled?: boolean;
  loading?: boolean;
};

const BottomNavigator = ({
  actionText,
  actionFunc,
  actionBtnDisabled = false,
  loading = false,
}: Props) => {
  return (
    <View className="py-3 px-6 flex flex-row items-center gap-6 border-t border-t-[#F0F0F0]">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.back()}
        className="border-[2px] rounded-xl px-6 py-3"
      >
        <Feather className="" name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={actionBtnDisabled}
        activeOpacity={0.9}
        onPress={actionFunc}
        style={{ opacity: actionBtnDisabled ? 0.3 : 1 }}
        className="bg-primary rounded-xl px-6 py-3 flex-1 min-h-[56px] flex items-center justify-center"
      >
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <Text className="text-sm font-popmedium text-white text-center tracking-[0.014px] ">
            {actionText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
