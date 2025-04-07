import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  active: boolean;
  onPress: () => void;
  value: string;
};

const SurveyQuestionBox = ({ active, onPress, value }: Props) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (active) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Animated.View
        style={{ opacity: fadeAnim }}
        className={`${
          active && "bg-[#00B7803D] border-[2px] border-primary rounded-lg"
        } flex flex-row items-center gap-3 border-b-[2px] border-b-[#F6F6F6] py-4 px-3`}
      >
        {active ? (
          <Feather name="check-circle" size={24} color="#00B780" />
        ) : (
          <View className="h-2 w-2 bg-primary rounded-full"></View>
        )}
        <View>
          <Text className="text-sm font-pop tracking-[0.035px]">{value}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SurveyQuestionBox;

const styles = StyleSheet.create({});
