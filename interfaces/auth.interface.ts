export interface SignInData {
  login: string;
  password: string;
}

export interface SignUpData extends SignInData {
  name: string;
  confirmPassword: string;
}
