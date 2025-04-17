import { useNotification } from "@/context/NotificationContext";
import {
  GetAllTasksParams,
  UseLandInvestigationProps,
} from "@/interfaces/queryProps.interface";
import {
  IFiStatusDTO,
  ILandInvestigationDetails,
} from "@/interfaces/requests/survey.interface";
import {
  completeFieldInvestigation,
  fiStatus,
  getAllTasks,
} from "@/services/surveyplan";
import handleAPIError from "@/utils/apiErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTasks = (params: GetAllTasksParams, isEnabled: boolean) => {
  const { notify } = useNotification();

  const { data, isFetching, isLoading, refetch, ...rest } = useQuery({
    queryKey: ["tasks", params],
    queryFn: () => getAllTasks(params),
    enabled: isEnabled,
  });
  return {
    fetchingTasks: isFetching,
    isLoadingTasks: isLoading,
    refetchTasks: refetch,
    tasks: data,
    rest,
  };
};

export const useFieldTaskStatus = (props: UseLandInvestigationProps) => {
  const { notify } = useNotification();
  const { onSuccess, onError } = props;

  const { mutate, isError, isPending, reset, ...rest } = useMutation({
    mutationFn: (payload: IFiStatusDTO) => fiStatus(payload),
    onSuccess: (values) => {
      notify(values.message, "success");
      if (onSuccess) {
        onSuccess(values);
      }
    },
    onError: (error: unknown) => {
      notify("Something went wrong", "error");

      if (onError) {
        reset();
        onError(handleAPIError(error));
      }
    },
  });

  return {
    updateStatus: mutate,
    updatingStatus: isPending,
    ...rest,
  };
};
export const useLandInvestigation = (props: UseLandInvestigationProps) => {
  const { notify } = useNotification();
  const { onSuccess, onError } = props;

  const { mutate, isError, isPending, reset, ...rest } = useMutation({
    mutationFn: (payload: ILandInvestigationDetails) =>
      completeFieldInvestigation(payload),
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess(values);
        notify(values.message, "success");
      }
    },
    onError: (error: unknown) => {
      if (onError) {
        reset();
        onError(handleAPIError(error));
      }
    },
  });

  return {
    fieldMutation: mutate,
    fieldSubmitting: isPending,
    ...rest,
  };
};
