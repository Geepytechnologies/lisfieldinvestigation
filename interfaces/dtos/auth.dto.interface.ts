/****************************** SIGN IN DTO ******************************/
export interface ISignInDTO {
  email: string;
  password: string;
}

/****************************** REGISTER DEVICE DTO ******************************/
export interface IRegisterDeviceDTO {
  staffId: string;
  deviceToken: string;
  deviceName: string;
}
