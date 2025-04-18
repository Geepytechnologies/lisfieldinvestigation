import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useLocalSearchParams } from "expo-router";
import RightCaret from "@/assets/svg/right-caret.svg";
import SurveyDetailRow from "@/components/survey/SurveyDetailRow";

import BottomSheetPopup from "@/components/ui/BottomSheetPopup";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useUserStore } from "@/config/store";
import { useFieldTaskStatus, useGetTasks } from "@/queries/surveyplan";
import { formatDate } from "@/utils/DateFormatter";
import Checkbox from "@/components/ui/CheckBox";
import { useNotification } from "@/context/NotificationContext";
import Loader from "@/components/ui/Loader";
import { useFormData } from "@/context/FormContext";
import { Skeleton } from "@/components/survey/Skeleton";
import PageLoader from "@/components/survey/PageLoader";

type Props = {};

const Assignedtask = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const { id } = useLocalSearchParams();
  const { tasks, refetchTasks, fetchingTasks } = useGetTasks(
    { SurveyPlanNumber: id as string },
    !!id
  );
  const { updateForm, setApplicantSubmission } = useFormData();
  const { updateStatus, updatingStatus } = useFieldTaskStatus({
    onSuccess: () => {
      refetchTasks();
      setStatusClicked("");
    },
  });
  const [statusClicked, setStatusClicked] = useState("");
  const bottomsheetRef = useRef<BottomSheetMethods>(null);
  const [selectedItems, setSelectedItems] = useState<string>("");
  const { notify } = useNotification();

  const handleToggle = (option: string) => {
    setSelectedItems((prev) => (prev === option ? "" : option));
  };

  const openSheet = () => {
    bottomsheetRef.current?.snapToIndex(0);
  };
  const closeSheet = () => {
    bottomsheetRef.current?.close();
  };

  const handleStatus = (status: string) => {
    if (!selectedItems) {
      notify("Choose a date for Field Investigation", "error");
      return;
    }
    setStatusClicked(status);
    updateStatus({
      surveyPlanNumber: tasks?.data[0].surveyPlanNumber ?? "",
      status: status,
      investigatedOn: new Date().toISOString(),
      selectedInvestigationDateScheduleId: selectedItems as string,
      userId: user?.staffId as string,
    });
  };
  const uniqueSchedules = tasks?.data[0].investigationSchedule
    .map((s) => JSON.parse(s))
    .filter(
      (value, index, self) =>
        index === self.findIndex((v) => v.schedule_id === value.schedule_id)
    );
  return (
    <>
      {fetchingTasks ? (
        <PageLoader />
      ) : (
        <SafeAreaView className="p-3 bg-white" style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            className="flex-1"
          >
            <View className="flex flex-row">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.9}
                className="bg-black gap-3 flex flex-row items-center px-3 py-[10px] rounded-[100px] "
              >
                <Feather
                  className=""
                  name="arrow-left"
                  size={24}
                  color="white"
                />
                <Text className="text-[10px] text-white font-pop leading-normal tracking-[0.15px]">
                  BACK
                </Text>
              </TouchableOpacity>
            </View>
            <Text className="bg-[#C8E4FF] text-[10px]font-pop leading-normal tracking-[0.15px] px-3 py-4 rounded-[8px] mt-10">
              TASK
            </Text>
            {/* details */}
            <View className="my-2">
              <SurveyDetailRow
                label={"Surveyor"}
                value={tasks?.data[0].surveyor ?? ""}
                showExtraValue={true}
                extravalue={tasks?.data[0].surveyPlanNumber ?? ""}
              />
              <SurveyDetailRow
                label={"Survey Plan Number"}
                value={tasks?.data[0].surveyPlanNumber ?? ""}
              />
              <SurveyDetailRow
                label={"Survey Date"}
                value={
                  formatDate(new Date(tasks?.data[0].surveyDate as string)) ??
                  ""
                }
              />
              <SurveyDetailRow
                label={"Land Address"}
                value={tasks?.data[0].address ?? ""}
              />
              <SurveyDetailRow
                label={"Land Description"}
                value={tasks?.data[0].landDescription ?? ""}
              />
              <SurveyDetailRow
                label={"Cadastral Zone"}
                value={tasks?.data[0].cadastralZone ?? ""}
              />
              <SurveyDetailRow
                label={"Land Owner"}
                value={tasks?.data[0].landownerName ?? ""}
              />
              {tasks?.data[0].assignmentStatus == "Assigned" ? (
                <View className="mt-5 flex flex-col items-center">
                  <Text className="text-[10px] text-center font-pop leading-normal tracking-[0.15px] uppercase">
                    Select Date Available For Field Investigation
                  </Text>
                  {uniqueSchedules &&
                    uniqueSchedules.map((schedule, idx) => {
                      return (
                        <Checkbox
                          key={idx}
                          label={formatDate(schedule?.proposed_date)}
                          isSelected={selectedItems == schedule.schedule_id}
                          onToggle={() => handleToggle(schedule.schedule_id)}
                        />
                      );
                    })}
                </View>
              ) : tasks?.data[0].assignmentStatus == "Accepted" ? (
                <View className="mt-5 flex flex-col items-center">
                  <Text className="text-[10px] text-center font-pop leading-normal tracking-[0.15px] uppercase">
                    Selected Date For Field Investigation
                  </Text>
                  {tasks?.data[0].investigationSchedule
                    .filter((s) => JSON.parse(s).schedule_status == "Reserved")
                    .map((schedule, idx) => {
                      const parsedSchedule = JSON.parse(schedule);
                      return (
                        <Checkbox
                          key={idx}
                          label={formatDate(parsedSchedule?.proposed_date)}
                          isSelected={true}
                          onToggle={() => {}}
                        />
                      );
                    })}
                </View>
              ) : null}

              {tasks?.data[0].assignmentStatus == "Assigned" && (
                <View className="flex items-center justify-center mt-10 flex-row gap-3">
                  <TouchableOpacity
                    disabled={updatingStatus}
                    onPress={() => handleStatus("Rejected")}
                    activeOpacity={0.9}
                    className="flex items-center px-11 py-4  bg-black rounded-[10px]"
                  >
                    {statusClicked == "Rejected" && updatingStatus ? (
                      <Loader loading={updatingStatus} />
                    ) : (
                      <Text className="text-white uppercase">Reject</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={updatingStatus}
                    onPress={() => handleStatus("Accepted")}
                    activeOpacity={0.9}
                    className="flex items-center px-11 py-4 rounded-[10px]  bg-[#1E83F0] "
                  >
                    {statusClicked == "Accepted" && updatingStatus ? (
                      <Loader loading={updatingStatus} />
                    ) : (
                      <Text className="text-white uppercase">Accept</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
          {/* button */}
          {tasks?.data[0].assignmentStatus == "Accepted" && (
            <View className="mt-auto">
              <TouchableOpacity activeOpacity={0.9} onPress={openSheet}>
                <LinearGradient
                  colors={["#1E83F0", "#000000"]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.button}
                >
                  <Text className="font-popmedium text-sm uppercase text-white text-center flex-1">
                    Action
                  </Text>
                  <View className="flex justify-center">
                    <RightCaret fill={"white"} stroke={"white"} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          <BottomSheetPopup ref={bottomsheetRef} snapTo={["35%"]}>
            <View className="flex gap-3 mt-3">
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  closeSheet();
                  router.push("/(protected)/map/mapview");
                }}
                className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
              >
                <Text className="text-white">Navigate To</Text>
                <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                  <RightCaret fill={"white"} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  closeSheet();
                  router.push("/(protected)/map/mapview");
                }}
                className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
              >
                <Text className="text-white">View on Map</Text>
                <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                  <RightCaret fill={"white"} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => {
                  closeSheet();
                  updateForm(
                    "surveyPlanNumber",
                    tasks?.data[0].surveyPlanNumber as string
                  );
                  setApplicantSubmission(tasks?.data[0].landSize);
                  updateForm("investigatedBy", user?.staffId as string);
                  router.push("/(protected)/fieldinvestigation/Q1");
                }}
                className="flex flex-row justify-between bg-[#181818] px-3 py-[10px] rounded-[12px] active:bg-primary"
              >
                <Text className="text-white">Start Field Investigation</Text>
                <View className="flex justify-center items-center rounded-[100px] bg-[#8080801F] w-8 h-8">
                  <RightCaret fill={"white"} />
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheetPopup>
        </SafeAreaView>
      )}
    </>
  );
};

export default Assignedtask;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
