import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const FIlayout = (props: Props) => {
  return (
    <Stack initialRouteName="Q1">
      <Stack.Screen name="Q1" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FIlayout;

const styles = StyleSheet.create({});
