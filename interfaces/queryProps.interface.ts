import { ISignInResponse } from "./responses/auth.interface";

export interface UseSignInProps {
  onSuccess?: (_val: ISignInResponse) => void;
  onReset?: () => void;
  onError?: (message: string) => void;
}
