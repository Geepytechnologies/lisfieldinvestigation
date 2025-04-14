import { useNotification } from "@/context/NotificationContext";
import { ISignInDTO } from "@/interfaces/dtos/auth.dto.interface";
import { UseSignInProps } from "@/interfaces/queryProps.interface";
import { ISignInResponse } from "@/interfaces/responses/auth.interface";
import { loginUser } from "@/services/auth";
import { postRequest } from "@/utils/apiCaller";
import handleAPIError from "@/utils/apiErrorMessage";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = (props: UseSignInProps) => {
  const { notify } = useNotification();
  const { onSuccess, onError } = props;

  const { mutate, isError, isPending, reset, ...rest } = useMutation({
    mutationFn: loginUser,
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
    loginMutation: mutate,
    loggingIn: isPending,
    ...rest,
  };
};
