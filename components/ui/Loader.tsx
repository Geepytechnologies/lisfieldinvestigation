import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Reload from "@/assets/svg/reload.svg";

type Props = {
  loading: boolean;
};

const Loader = ({ loading }: Props) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (loading) {
      rotateValue.setValue(0);
      animation.current = Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.current.start();
    } else {
      animation.current?.stop();
    }
  }, [loading]);
  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <Animated.View
      style={{ transform: [{ rotate: spin }] }}
      className="flex items-center justify-center"
    >
      <Reload />
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
