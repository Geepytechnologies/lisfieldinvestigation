export type IErrors = {
  attemptedValue: string | null;
  customState: string | null;
  errorCode: string;
  errorMessage: string;
  message: string;
  propertyName: string;
  severity: number;
  formattedMessagePlaceholderValues: {
    PropertyName: string;
    PropertyPath: string;
    PropertyValue: string | null;
  };
};

/****************************** ROLES TYPE ******************************/
export type IRolesType =
  | "Admin"
  | "Governor"
  | "Managing Director"
  | "Director Land Services"
  | "Head Registration/Certificate and Titles"
  | "Front Desk Officer"
  | "Verification Officer"
  | "Vetting Officer"
  | "Head Land Registry"
  | "Registry Officer"
  | "Head Town Planning"
  | "Town Planning Officer"
  | "Head Archives/Document Control"
  | "Director Geomatics & IT Services"
  | "Head Surveying"
  | "Surveying Officer"
  | "Certificate Officer"
  | "Head Mapping & Production"
  | "Head Field Audit"
  | "Head IT Services"
  | "Executive Management Role";

export type ISuccessResponse = {
  error: IErrors[] | null | undefined;
  success: boolean;
  message: string;
};
