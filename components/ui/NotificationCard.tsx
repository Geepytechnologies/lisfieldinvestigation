import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { formatDate } from "@/utils/DateFormatter";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  item: any;
  onDelete: (id: string) => Promise<void>;
};

const NotificationCard = ({ item, onDelete }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between my-3 bg-white p-3 rounded-[12px]">
      <View className="flex flex-row items-center gap-3">
        <Image
          resizeMode="cover"
          className="h-[40px] w-[40px] rounded-full"
          source={require("@/assets/images/stateicon.png")}
        />
        <View className="flex flex-col gap-1">
          <Text className="text-sm font-popmedium">{item.title}</Text>
          <Text className="text-xs">{item.body}</Text>
          <Text className="text-xs text-[#808080]">
            {formatDate(item.timestamp)}
          </Text>
        </View>
      </View>
      <AntDesign
        onPress={() => onDelete(item.id)}
        name="delete"
        size={24}
        color="red"
      />
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
