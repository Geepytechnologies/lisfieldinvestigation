import { useEffect } from "react";
import Auth from "@/utils/auth";
import { useUserStore } from "@/config/store";

const useAuthCheck = () => {
  const setAuthStatus = useUserStore((state) => state.setAuthStatus);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await Auth.isAuthenticated();
      setAuthStatus(authStatus);
    };

    checkAuthStatus();
  }, [setAuthStatus]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated;
};

export default useAuthCheck;
