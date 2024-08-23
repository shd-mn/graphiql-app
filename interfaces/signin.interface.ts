export interface SignInData {
  login: string;
  password: string;
}

export interface SignUpData extends SignInData {
  confirmPassword: string;
}
