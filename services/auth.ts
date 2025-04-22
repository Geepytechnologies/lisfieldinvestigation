import { useUserStore } from "@/config/store";
import {
  IRegisterDeviceDTO,
  ISignInDTO,
} from "@/interfaces/dtos/auth.dto.interface";
import { ISignInResponse } from "@/interfaces/responses/auth.interface";
import { ISuccessResponse } from "@/interfaces/responses/general.interface";
import { postRequest } from "@/utils/apiCaller";
import Auth from "@/utils/auth";
import { saveUser, clearUser } from "@/utils/userStore";
const { setToken, setRefreshToken } = Auth;

export const loginUser = async (payload: ISignInDTO) => {
  try {
    const response = await postRequest<ISignInDTO, ISignInResponse>({
      url: "/Authentication/portal-login",
      payload,
    });
    await setToken(response.data.token as string);
    await saveUser(response.data);
    useUserStore.getState().setUser(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const RegisterDevice = async (payload: IRegisterDeviceDTO) => {
  try {
    const response = await postRequest<IRegisterDeviceDTO, ISuccessResponse>({
      url: "/User/register-device",
      payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await setToken("");
  await clearUser();
  useUserStore.getState().clearUser();
};
