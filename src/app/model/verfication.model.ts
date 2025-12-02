export interface VerificationRequest {
  email: string;
  code: string;
}

export interface VerificationResponse {
  message: string;
}

export interface ResendCodeRequest {
  email: string;
}
