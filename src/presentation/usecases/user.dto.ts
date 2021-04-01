export type UserCreateRequest = {
  username: string;
  email: string;
  password: string;
  realm: string;
}

export type UserLoginRequest = {
  email: string;
  password: string;
}

export type IUserJwT = {
  id: number;
  username: string;
  email: string;
  password: string;
  realm: string;
  emailVerified: boolean;
  created_at: Date;
  updated_at: Date;
}
