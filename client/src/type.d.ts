export interface AuthResponse {
  success: boolean;
  message: string;
}

export interface UserData {
  name: string;
  isAccountVerified: boolean;
}

export interface UserDataResponse {
  success: boolean;
  userData: UserData;
}

export interface IsAuthResponse {
  success: boolean;
}
