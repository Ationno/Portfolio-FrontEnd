import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUsuario } from '../model/login-usuario';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authURL = "https://backend-0oz6.onrender.com/auth/";

	constructor(private httpClient: HttpClient) { }

	public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
		return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario)
	}
}
