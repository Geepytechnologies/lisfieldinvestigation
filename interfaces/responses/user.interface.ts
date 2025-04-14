import { IRolesType } from "./general.interface";
import { JwtPayload } from "jwt-decode";

export interface IUserResponse extends JwtPayload {
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phoneNumber1: string;
  phoneNumber2: string | null;
  staffId: string;
  staffRoleId: number;
  divisionId: number | null;
  division: string | null;
  staffRole: IRolesType;
  employmentId: string;
  staffImageId: string;
  staffImage: string;
  password: string;
  status: string;
  token: string | null;
  createdat: string;
}
