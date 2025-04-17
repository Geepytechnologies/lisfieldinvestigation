import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, Stack } from "expo-router";
import Auth from "@/utils/auth";

type Props = {};

const ProtectedLayout = (props: Props) => {
  const { isAuthenticated } = Auth;

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuthenticated();
      console.log({ isAuthenticated: res });
      if (!res) {
        router.replace("/(auth)/signin");
      }
    };

    checkAuth();
  }, []);
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
      <Stack.Screen
        name="tasks/pendingtasks"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tasks/completedtasks"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default ProtectedLayout;

const styles = StyleSheet.create({});
