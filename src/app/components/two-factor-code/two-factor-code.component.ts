import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-two-factor-code',
  templateUrl: './two-factor-code.component.html',
  styleUrls: ['./two-factor-code.component.css'],
})
export class TwoFactorCodeComponent implements OnInit {
  codeForm: FormGroup; // Formulario para ingresar el código
  correo: string = ''; // Correo del usuario

  constructor(
    private fb: FormBuilder,
    private usuarioServicio: UsuarioServicioService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    // Inicializar el formulario
    this.codeForm = this.fb.group({
      codigo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el correo del usuario actual para usar en la validación
    this.usuarioServicio.obtenerUsuarioActual().subscribe((usuario) => {
      this.correo = usuario?.correo || '';
    });
  }

  // Método de envío para validar el código
  onSubmit(): void {
    if (this.codeForm.valid) {
      const loginData: Login = { correo: this.correo, clave: this.codeForm.value.codigo };

      this.usuarioServicio.validarQRCode(loginData).subscribe((response) => {
        if (response.status) {
          this._snackBar.open('Código validado correctamente', '¡Éxito!', { duration: 3000 });
          this.router.navigate(['pages']); // Redirigir a la siguiente página
        } else {
          this._snackBar.open('Código incorrecto', 'Error', { duration: 3000 });
        }
      });
    } else {
      this._snackBar.open('Por favor, ingresa el código', 'Advertencia', { duration: 3000 });
    }
  }
}
