import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, router, Stack } from "expo-router";

type Props = {};

const ProtectedLayout = (props: Props) => {
  const token = true;

  if (!token) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="fieldinvestigation"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="map/mapview" options={{ headerShown: false }} />
      <Stack.Screen
        name="tasks/assignedtask"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tasks/assignedtasks"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
