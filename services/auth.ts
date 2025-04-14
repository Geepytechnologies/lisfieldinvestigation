import { useUserStore } from "@/config/store";
import { ISignInDTO } from "@/interfaces/dtos/auth.dto.interface";
import { ISignInResponse } from "@/interfaces/responses/auth.interface";
import { postRequest } from "@/utils/apiCaller";
import { saveUser } from "@/utils/userStore";

export const loginUser = async (payload: ISignInDTO) => {
  const response = await postRequest<ISignInDTO, ISignInResponse>({
    url: "/Authentication/portal-login",
    payload,
  });
  await saveUser(response.data);
  useUserStore.getState().setUser(response.data);
  return response;
};
