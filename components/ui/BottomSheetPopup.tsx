import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, RefObject, useCallback, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CloseIcon from "@/assets/svg/close.svg";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  children: React.ReactNode;
  snapTo: string;
};

const BottomSheetPopup = forwardRef<BottomSheetMethods, Props>(
  ({ children, snapTo }, ref) => {
    const snapPoints = useMemo(() => [snapTo], [snapTo]);

    const closeSheet = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
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
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleComponent={null}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="bg-black flex-1 p-3 rounded-t-[16px]">
          <View className="flex flex-row justify-between items-center mt-5">
            <Text className="text-white font-popmedium text-xl">Action</Text>
            <CloseIcon onPress={closeSheet} />
          </View>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomSheetPopup;

const styles = StyleSheet.create({});
