import { ISuccessResponse } from "./general.interface";
import { IUserResponse } from "./user.interface";

export type ISignInResponse = {
  data: IUserResponse;
} & ISuccessResponse;
