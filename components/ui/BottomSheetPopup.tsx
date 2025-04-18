import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CloseIcon from "@/assets/svg/close.svg";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  children: React.ReactNode;
  snapTo: string[];
  label?: string;
};

const BottomSheetPopup = forwardRef<BottomSheetMethods, Props>(
  ({ children, snapTo, label = "Action" }, ref) => {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    useImperativeHandle(
      ref,
      () => ({
        ...bottomSheetRef.current!,
      }),
      []
    );
    const snapPoints = useMemo(() => snapTo, [snapTo]);

    const closeSheet = () => {
      bottomSheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <BottomSheet
        index={-1}
        keyboardBehavior="interactive"
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="bg-black flex-1 p-3 rounded-t-[16px]">
          <View className="flex flex-row justify-between items-center mt-5">
            <Text className="text-white font-popmedium text-xl">{label}</Text>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.9}
              onPress={closeSheet}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetPopup;

const styles = StyleSheet.create({});
