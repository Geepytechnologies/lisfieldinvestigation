import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  index: number;
  question: string;
  answer?: string;
  hasChildren?: boolean;
  children?: React.ReactNode;
};

const QuestionPreview = ({
  index,
  question,
  answer,
  hasChildren = false,
  children,
}: Props) => {
  return (
    <View>
      <View className="flex flex-row gap-3 pb-3 border-b border-b-[#f0f0f0]">
        <Text className="text-sm font-popmedium tracking-[0.014px]">
          Q{index}
        </Text>
        <Text className="text-sm font-popmedium">{question}</Text>
      </View>
      <View className="flex flex-row gap-3 pt-[6px] pb-3 border-b border-b-[#2B58DA]">
        <Text className="text-sm font-popmedium tracking-[0.014px]">
          A{index}
        </Text>
        {!hasChildren ? (
          <Text className="text-xs font-pop">{answer}</Text>
        ) : (
          <View>{children}</View>
        )}
      </View>
    </View>
  );
};

export default QuestionPreview;

const styles = StyleSheet.create({});
