import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabNavigationState } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export type TabBarProps = {
  state: TabNavigationState; // Represents the state of the tab navigation
  descriptors: BottomTabBarProps; // Describes the screen options for each tab
  navigation: BottomTabBarProps;
};

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  return (
    <View className="flex items-center justify-center bg-[#f0f0f0]">
      <View
        className="bg-black rounded-t-[24px]"
        style={{
          flexDirection: "row",
          minHeight: 76,
        }}
      >
        {state.routes.map(
          (
            route: { key: string | number; name: any },
            index: React.Key | null | undefined
          ) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const getLogoIcon = (route: any, isFocused: boolean) => {
              switch (route.name) {
                case "home":
                  return isFocused ? (
                    <Ionicons name="home" size={24} color="white" />
                  ) : (
                    <Ionicons name="home-outline" size={24} color="white" />
                  );

                case "notification":
                  return isFocused ? (
                    <Ionicons name="notifications" size={24} color="white" />
                  ) : (
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="white"
                    />
                  );

                case "account":
                  return isFocused ? (
                    <FontAwesome name="user" size={24} color="white" />
                  ) : (
                    <FontAwesome name="user-o" size={24} color="white" />
                  );

                default:
                  return;
              }
            };

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={onPress}
                style={{
                  flex: 1,
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <View className="flex flex-col items-center justify-center gap-[3px]">
                  {getLogoIcon(route, isFocused)}
                  <Text
                    className="font-pop"
                    style={{
                      color: isFocused ? "#FEFEFE" : "#BDBDBD",
                      lineHeight: 18,
                      fontSize: 12,
                    }}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
