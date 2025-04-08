import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

type Props = {};

const FIlayout = (props: Props) => {
  return (
    <Stack initialRouteName="Q1">
      <Stack.Screen name="Q1" options={{ headerShown: false }} />
      <Stack.Screen name="Q2" options={{ headerShown: false }} />
      <Stack.Screen name="Q2B" options={{ headerShown: false }} />
      <Stack.Screen name="Q3" options={{ headerShown: false }} />
      <Stack.Screen name="Q4" options={{ headerShown: false }} />
      <Stack.Screen name="Q5" options={{ headerShown: false }} />
      <Stack.Screen name="Q6" options={{ headerShown: false }} />
      <Stack.Screen name="Q7" options={{ headerShown: false }} />
      <Stack.Screen name="Q7B" options={{ headerShown: false }} />
      <Stack.Screen name="finish" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FIlayout;

const styles = StyleSheet.create({});
