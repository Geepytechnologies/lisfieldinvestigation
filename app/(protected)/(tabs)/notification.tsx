import {
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useLocalNotificationService } from "@/hooks/useLocalNotificationService";
import { set } from "lodash";
import NotificationCard from "@/components/ui/NotificationCard";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useFocusEffect } from "expo-router";
import NoRecord from "@/components/survey/NoRecord";

type Props = {};

const Notification = (props: Props) => {
  const {
    getUnreadCount,
    getNotifications,
    deleteNotifications,
    deleteNotificationById,
  } = useLocalNotificationService();
  const [count, setCount] = React.useState(0);
  const [notifications, setNotifications] = React.useState([]);
  const loadData = async () => {
    const count = await getUnreadCount();
    const notifs = await getNotifications();
    setCount(count);
    setNotifications(notifs);
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );
  const handleDelete = async (id: string) => {
    await deleteNotificationById(id);
    loadData();
  };
  const RenderItem = ({ item }: any) => {
    return <NotificationCard item={item} onDelete={handleDelete} />;
  };
  const dummy = [1, 2, 3, 4];
  const { sendPushNotification } = usePushNotifications();
  return (
    <ImageBackground
      style={styles.backgroundImage}
      imageStyle={styles.backgroundImageStyle}
      source={require("@/assets/images/spiralbackground.jpg")}
    >
      <View className="" style={styles.overlay}></View>
      <SafeAreaView className="w-full px-6" style={[{ flex: 1 }]}>
        <View className="mt-[10px] px-5 flex flex-row items-center mb-3">
          <Text className="font-popmedium text-2xl flex-1 text-center">
            Notifications
          </Text>
          <View className="relative">
            <Ionicons name="notifications" size={24} color="black" />
            {count >= 1 && (
              <View className="h-5 w-5 rounded-full bg-red-500 absolute -top-1 -right-1 items-center justify-center">
                <Text className="text-white text-xs">{count}</Text>
              </View>
            )}
          </View>
        </View>

        {notifications.length == 0 && <NoRecord />}
        <FlatList renderItem={RenderItem} data={notifications} />
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
