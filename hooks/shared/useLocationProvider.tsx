import { useState, useCallback } from "react";
import * as Location from "expo-location";

const useLocationProvider = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = useCallback(async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLocation(null);
        return null;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setErrorMsg(null);
      return currentLocation;
    } catch (error) {
      setErrorMsg("Failed to fetch location");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    location,
    errorMsg,
    loading,
    getLocation, // expose the function
  };
};

export default useLocationProvider;
