import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from './../model/auth.model';
import { RegisterRequest, RegisterResponse } from '../model/inscription.model';
import { VerificationRequest, VerificationResponse, ResendCodeRequest } from '../model/verfication.model';
import { ForgotPasswordRequest, ForgotPasswordResponse } from '../model/motdepasse.model';
import { VerifyResetCodeRequest, VerifyResetCodeResponse ,ResetPasswordRequest} from '../model/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = "http://localhost:8081/api/auth";

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, data).pipe(
      tap((res) => {
        // Sauvegarde Session Storage
        sessionStorage.setItem('idUtilisateur', res.idUtilisateur.toString());
        sessionStorage.setItem('role', res.role);
        sessionStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  logout() {
    sessionStorage.clear();
  }

  getRole() {
    return sessionStorage.getItem('role');
  }

  getIdUtilisateur() {
    return sessionStorage.getItem('idUtilisateur');
  }
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API}/register`, data);
  }

    verifyCode(data: VerificationRequest): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.API}/verifier-code`, data);
  }

  resendCode(data: ResendCodeRequest) {
    return this.http.post(`${this.API}/renvoyer-code`, data);
  }

   forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse | string> {
    return this.http.post(`${this.API}/motdepasse/forgot?email=${data.email}`, {}, { responseType: 'text' });
  }
  verifyResetCode(data: VerifyResetCodeRequest) {
  return this.http.post(
    `${this.API}/motdepasse/verifier?email=${data.email}&code=${data.code}`,
    {},
    { responseType: 'text' }
  );
}

resetPassword(data: ResetPasswordRequest) {
  return this.http.post(
    `${this.API}/motdepasse/reset?email=${data.email}&motDePasse=${data.motDePasse}`,
    {},
    { responseType: 'text' }
  );
}

}
