import { useNotification } from "@/context/NotificationContext";
import {
  IRegisterDeviceDTO,
  ISignInDTO,
} from "@/interfaces/dtos/auth.dto.interface";
import {
  UseRegisterDeviceProps,
  UseSignInProps,
} from "@/interfaces/queryProps.interface";
import { ISignInResponse } from "@/interfaces/responses/auth.interface";
import { loginUser, RegisterDevice } from "@/services/auth";
import { postRequest } from "@/utils/apiCaller";
import handleAPIError from "@/utils/apiErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = (props: UseSignInProps) => {
  const { notify } = useNotification();
  const { onSuccess, onError } = props;

  const { mutate, isError, isPending, reset, ...rest } = useMutation({
    mutationFn: (payload: ISignInDTO) => loginUser(payload),
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess(values);
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
    loginMutation: mutate,
    loggingIn: isPending,
    ...rest,
  };
};

export const useRegisterDevice = (props: UseRegisterDeviceProps) => {
  const { notify } = useNotification();
  const { onSuccess, onError } = props;

  const { mutate, isError, isPending, reset, ...rest } = useMutation({
    mutationFn: (payload: IRegisterDeviceDTO) => RegisterDevice(payload),
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess(values);
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
    registerDevice: mutate,
    registeringDevice: isPending,
    ...rest,
  };
};
