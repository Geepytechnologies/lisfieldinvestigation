import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

type Props = {};

const Notification = (props: Props) => {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      source={require("@/assets/images/spiralbackground.jpg")}
    >
      <View className="" style={styles.overlay}></View>
      <SafeAreaView className="w-full" style={[{ flex: 1 }]}>
        <View className="mt-[10px] flex items-center">
          <Text className="font-popmedium text-2xl">Notifications</Text>
        </View>

        <StatusBar style="dark" />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Notification;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImageStyle: {
    opacity: 0.5,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f2f3f8",
    opacity: 0.5,
  },
});
