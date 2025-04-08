import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect, router, Stack } from "expo-router";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="forgotpassword" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
