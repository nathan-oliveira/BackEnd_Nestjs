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
