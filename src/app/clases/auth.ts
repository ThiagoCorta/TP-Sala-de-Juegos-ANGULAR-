export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResgisterPayload extends LoginPayload {}
