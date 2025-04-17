import { GetAllTasksParams } from "@/interfaces/queryProps.interface";
import {
  IFiStatusDTO,
  ILandInvestigationDetails,
} from "@/interfaces/requests/survey.interface";
import {
  ILandInvestigationResponse,
  ISurveyTasksResponse,
} from "@/interfaces/responses/survey.interface";
import { getRequestParams, putRequest } from "@/utils/apiCaller";

export const getAllTasks = async (params: GetAllTasksParams) => {
  const response = await getRequestParams<
    GetAllTasksParams,
    ISurveyTasksResponse
  >({
    url: "/SurveyPlanCaseManagement/field-investigation",
    params,
  });
  return response;
};

export const fiStatus = async (payload: IFiStatusDTO) => {
  const response = await putRequest<IFiStatusDTO, ILandInvestigationResponse>({
    url: "/SurveyPlanCaseManagement/field-investigation/status",
    payload,
  });
  return response;
};
export const completeFieldInvestigation = async (
  payload: ILandInvestigationDetails
) => {
  const response = await putRequest<
    ILandInvestigationDetails,
    ILandInvestigationResponse
  >({
    url: "/SurveyPlanCaseManagement/field-investigation/result",
    payload,
  });
  return response;
};
