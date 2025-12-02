export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface VerifyResetCodeResponse {
  message: string;
}
export interface ResetPasswordRequest {
  email: string;
  motDePasse: string;
}

export interface ResetPasswordResponse {
  message: string;
}
