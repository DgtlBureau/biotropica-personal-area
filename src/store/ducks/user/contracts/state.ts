import { ISelect } from '../../../../pages/Profile/pages/Edit/components/EditProfileData/EditProfileData';
import { LoadingStatus } from '../../../types';

export interface User {
  id: number;
  email: string;
  password: string;
  profile_photo: string;
  name: string;
  lastname: string;
  patronymic: string;
  dob?: string;
  phone: string;
  gender: string;
  before_photos: JSON;
  after_photos: JSON;
  paid: boolean;
  banned: boolean;
  banReason: string;
  confirmed: boolean;
  confirmed_hash: string;
  refreshToken: string;
}

export interface UserState {
  user: User | undefined;
  status: LoadingStatus;
  response: any;
}

export interface SignupData {
  email: string;
  password: string;
  verification_password: string;
  name: string;
  lastname: string;
  phone: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  id?: number;
  email?: string;
  password?: string;
  profile_photo?: string;
  name?: string;
  lastname?: string;
  patronymic?: string;
  dob?: Date | null;
  phone?: string;
  gender?: ISelect[];
  before_photos?: JSON;
  after_photos?: JSON;
  paid?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}
export interface ChangePasswordData {
  current_password: string;
  password: string;
  verification_password: string;
}

export interface RestorePasswordData {
  password: string;
  verification_password: string;
  restoreToken?: string;
}
