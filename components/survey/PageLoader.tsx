import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "./Skeleton";

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <SafeAreaView className="p-4" style={{ flex: 1 }}>
      <Skeleton
        width={80}
        style={{ marginBottom: 16 }}
        height={40}
        borderRadius={100}
      />
      <Skeleton height={60} style={{ marginBottom: 10 }} />
      <View className="flex flex-col gap-4">
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <View className="flex flex-row items-center gap-4 mt-6">
          <Skeleton height={60} style={{ flex: 1 }} />
          <Skeleton height={60} style={{ flex: 1 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageLoader;

const styles = StyleSheet.create({});
