import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

type StoredNotification = {
  id: string;
  title: string;
  body: string;
  data: Record<string, any>;
  isRead: boolean;
  timestamp: string;
};

const STORAGE_KEY = "notifications";

export function useLocalNotificationService() {
  const saveNotification = useCallback(
    async (notif: Notifications.Notification) => {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: StoredNotification[] = existing ? JSON.parse(existing) : [];

      const newNotif: StoredNotification = {
        id: notif.request.identifier,
        title: notif.request.content.title ?? "",
        body: notif.request.content.body ?? "",
        data: notif.request.content.data ?? {},
        isRead: false,
        timestamp: new Date().toISOString(),
      };

      const updated = [newNotif, ...parsed];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    []
  );

  const markAsRead = useCallback(async (id: string) => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const notifications: StoredNotification[] = JSON.parse(stored);
    const updated = notifications.map((notif) =>
      notif.id === id ? { ...notif, isRead: true } : notif
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const getUnreadCount = useCallback(async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const notifications: StoredNotification[] = stored
      ? JSON.parse(stored)
      : [];
    return notifications.filter((n) => !n.isRead).length;
  }, []);

  const getNotifications = useCallback(async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }, []);

  const deleteNotifications = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const deleteNotificationById = useCallback(async (id: string) => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const notifications: StoredNotification[] = JSON.parse(stored);
    const updated = notifications.filter((notif) => notif.id !== id);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  return {
    saveNotification,
    markAsRead,
    getUnreadCount,
    deleteNotifications,
    deleteNotificationById,
    getNotifications,
  };
}
