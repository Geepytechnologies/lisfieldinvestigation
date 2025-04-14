import React, { createContext, useContext } from "react";
import Toast from "react-native-toast-message";
import {
  NotificationContextType,
  NotificationProviderProps,
} from "@/interfaces/context.interface";

// Create context
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const notify = (
    message: string,
    type: "success" | "error" | "info" = "success",
    description?: string
  ) => {
    Toast.show({
      type,
      text1: message,
      text2: description,
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toast />
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
