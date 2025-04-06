import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

type Props = {};

const Index = (props: Props) => {
  return (
    <View>
      <Redirect href={"/(auth)/signin"} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
