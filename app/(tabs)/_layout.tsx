import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBar, { TabBarProps } from "@/components/tabs/TabBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: TabBarProps) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: "Notification",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
        }}
      />
    </Tabs>
  );
}
