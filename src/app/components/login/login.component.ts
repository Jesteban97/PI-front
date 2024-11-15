import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioServicioService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.loading = true;
  
    const _login: Login = {
      correo: this.formLogin.value.email,
      clave: this.formLogin.value.password,
    };
  
    this._usuarioServicio.iniciarSesion(_login).subscribe({
      next: (data) => {
        if (data.status) {
          // Verificar si se requiere 2FA y si el código está presente
            if (data.value.twoFactor) {
              // Redirigir a pantalla de ingreso de código desde la app autenticadora
              this.router.navigate(['two-factor-code'], { 
                queryParams: { email: _login.correo } 
              });
            } else {
              // Redirigir a pantalla para mostrar QR y permitir ingreso manual del código
              this.router.navigate(['two-factor-setup'], { 
                queryParams: { email: _login.correo } 
              });
            }
          
        } else {
          this._snackBar.open('No se encontraron coincidencias', 'Oops!', {
            duration: 3000,
          });
        }
      },
      error: (e) => {
        this._snackBar.open('Hubo un error', 'Oops!', { duration: 3000 });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  
}
