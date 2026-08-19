export interface IAuth {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type TUserRole = 'admin' | 'moderator' | 'user';

export interface ICurrentUser {
  role: TUserRole;
}
