import { ILandInvestigationDetails } from "@/interfaces/requests/survey.interface";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Context types
interface FormContextType {
  applicantSubmission: number | undefined;
  setApplicantSubmission: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  formData: ILandInvestigationDetails;
  updateForm: <K extends keyof ILandInvestigationDetails>(
    field: K,
    value: ILandInvestigationDetails[K]
  ) => void;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Default initial state
const initialFormData: ILandInvestigationDetails = {
  surveyPlanNumber: "",
  landExistence: null,
  verifiedLandSize: 0,
  landSizeConformity: null,
  numberOfBeacons: null,
  longitude: null,
  latitude: null,
  beacons: [],
  beaconIndex: null,
  investigationRemark: "",
  investigatedBy: "",
};

// Provider
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] =
    useState<ILandInvestigationDetails>(initialFormData);
  const [applicantSubmission, setApplicantSubmission] = useState<number>();

  const updateForm = <K extends keyof ILandInvestigationDetails>(
    field: K,
    value: ILandInvestigationDetails[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateForm,
        applicantSubmission,
        setApplicantSubmission,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Hook to use the form context
export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};
