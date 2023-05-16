import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	isLogged = false;
	isLogginFail = false;
	loginUsuario!: LoginUsuario;
	form: FormGroup;
	nombreUsuario!: string;
	password!: string;
	roles: string[] = [];
	errMsj!: string;

	get Password(){
		return this.form.get("password");
	}
		
	get NombreUsuario(){
		return this.form.get("nombreUsuario");	
	}
	
	constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
		this.form = this.formBuilder.group({
			password: new FormControl('', {validators: [Validators.required, Validators.maxLength(14)], updateOn: "blur"}),
			nombreUsuario: new FormControl('', {validators: [Validators.required], updateOn: "blur"}),
		})
	}

	ngOnInit() {
		if (this.tokenService.getToken()) {
			this.isLogged = true;
			this.isLogginFail = false;
			this.roles = this.tokenService.getAuthorities();
		}
	}

	onLogin(event: Event){
		event.preventDefault;
		if (this.form.valid){
			this.loginUsuario = new LoginUsuario(this.form.get("nombreUsuario")?.value, this.form.get("password")?.value); 
			this.authService.login(this.loginUsuario).subscribe(data => {
					this.isLogged = true;
					this.isLogginFail = false;
					this.tokenService.setToken(data.token);
					this.tokenService.setUserName(data.nombreUsuario);
					this.tokenService.setAuthorities(data.authorities);
					this.roles = data.authorities;
					this.router.navigate([''], { skipLocationChange: false });
				}, err => {
					this.isLogged = false;
					this.isLogginFail = true;
					this.errMsj = err.error.mensaje;
					console.log(this.errMsj);
				}
			)
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
