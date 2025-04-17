import { ISignInResponse } from "./responses/auth.interface";
import { ILandInvestigationResponse } from "./responses/survey.interface";

export interface UseSignInProps {
  onSuccess?: (_val: ISignInResponse) => void;
  onReset?: () => void;
  onError?: (message: string) => void;
}
export type IBaseQueryParams = {
  PageNumber?: number;
  PageSize?: number;
  Search?: string;
  Sort?: string;
  FilterBy?: string;
  StartDate?: string;
  EndDate?: string;
};

export type GetAllTasksParams = {
  InvestigatedBy?: string;
  SurveyPlanNumber?: string;
  AssignedTo?: string;
  AssignmentStatus?: string;
  InvestigationStatus?: string;
  ApplicantName?: string;
} & IBaseQueryParams;

export interface UseLandInvestigationProps {
  onSuccess?: (_val: ILandInvestigationResponse) => void;
  onReset?: () => void;
  onError?: (message: string) => void;
}
