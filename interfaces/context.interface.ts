import { ReactNode } from "react";

/****************************** NOTIFICATION CONTEXTS ******************************/
export type NotificationContextType = {
  notify: (
    message: string,
    type?: "success" | "error" | "info",
    description?: string
  ) => void;
};

export type NotificationProviderProps = {
  children: ReactNode;
};
