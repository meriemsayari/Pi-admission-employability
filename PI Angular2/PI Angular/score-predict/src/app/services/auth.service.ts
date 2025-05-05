import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
 
import { jwtDecode } from "jwt-decode";
import { environment } from "../../environments/environment.prod";
import { UserDTO } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private tokenKey = "jwt_token"; // Key to store the token in localStorage
  private currentUser!: string;
  constructor(private http: HttpClient) {}

  registerUser(user: UserDTO): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(`${this.baseUrl}/auth/register`, user, {
      headers,
      responseType: "text" as "json",
    });
  }

loginUser(user: UserDTO): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  const body = new URLSearchParams();
  body.set('email', user.email!);
  body.set('password', user.password!);

  return this.http.post(`${this.baseUrl}/api/auth/login`, body.toString(), { headers });
}

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public logout() {
    // Clear the token from localStorage on logout
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem("currentUser");
  }

  public setToken(token: string) {
    // Store the token in localStorage after successful login
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public storeCurrentUser() {
    return localStorage.setItem("currentUser", this.currentUser);
  }

  public getCurrentUser() {
    return localStorage.getItem("currentUser");
  }

  public removeCurrentUser() {
    localStorage.removeItem("currentUser");
  }

  public getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null;
    }
    return null;
  }
}
