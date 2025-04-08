import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Link, router } from "expo-router";

type Props = {};

const signin = (props: Props) => {
  const [rememberMe, setRememberMe] = React.useState(false);
  return (
    <>
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <SafeAreaView
          className="p-6 flex justify-center"
          style={{ flex: 1, backgroundColor: "#00000070" }}
        >
          <View className="flex flex-col gap-20">
            <Text className="text-white font-pop text-[34px]">
              Field Investigation App for ENGIS
            </Text>
            <BlurView
              intensity={30}
              className="rounded-[12px] overflow-hidden border border-[#1E83F0] bg-[rgba(255,255,255,0.08)]  px-3 py-6"
            >
              <View className="flex flex-col gap-6">
                <View className="flex flex-col gap-1">
                  <Text className="font-pop text-primary text-2xl">Log In</Text>
                  <Text className="font-pop text-xs text-[#FFFFFFE5]">
                    Get started by logging in to your account
                  </Text>
                </View>
                <View className="flex flex-col gap-6">
                  <View className="">
                    <Text className="font-pop text-[10px] uppercase text-white">
                      Email
                    </Text>
                    <View className="p-3 bg-white rounded-lg border border-[#F0F0F0]">
                      <TextInput
                        className="text-[#999999] text-sm font-pop"
                        placeholder="okonkwo.ugo@engis.com"
                      />
                    </View>
                  </View>
                  <View className="">
                    <Text className="font-pop text-[10px] uppercase text-white">
                      Password
                    </Text>
                    <View className="p-3 bg-white rounded-lg border border-[#F0F0F0]">
                      <TextInput
                        className="text-[#999999] text-sm font-pop"
                        placeholder="Enter your password"
                      />
                    </View>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row gap-3 items-center">
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setRememberMe(!rememberMe)}
                        className="w-6 h-6 border-[2px] border-primary flex items-center justify-center bg-white rounded-md"
                      >
                        {rememberMe && (
                          <Feather
                            className="animate-fadeIn"
                            name="check"
                            size={16}
                            color="#00B780"
                          />
                        )}
                      </TouchableOpacity>
                      <Text
                        className={`${
                          rememberMe ? "text-primary" : "text-white"
                        } font-pop text-sm`}
                      >
                        Remember me
                      </Text>
                    </View>
                    <Link
                      href={"/(auth)/forgotpassword"}
                      className="text-primary text-sm font-pop"
                    >
                      Forgot Password?
                    </Link>
                  </View>
                </View>
              </View>
              <View className="my-8">
                {/* button */}
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push("/(protected)/(tabs)/index")}
                >
                  <LinearGradient
                    colors={["#00B780", "#000000"]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.button}
                  >
                    <Text className="font-popmedium text-sm uppercase text-white">
                      Login
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <Text className="font-pop text-white text-[10px]">
                By signing in, you agree with our{" "}
                <Text className="text-primary">terms </Text>and
                <Text className="text-primary"> privacy policy</Text>
              </Text>
            </BlurView>
          </View>
        </SafeAreaView>
        <StatusBar style="light" />
      </ImageBackground>
    </>
  );
};

export default signin;

const styles = StyleSheet.create({
  button: {
    borderRadius: 360,
    padding: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
