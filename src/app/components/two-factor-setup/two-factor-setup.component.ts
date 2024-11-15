import { Component, OnInit } from '@angular/core';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-two-factor-setup',
  templateUrl: './two-factor-setup.component.html',
  styleUrls: ['./two-factor-setup.component.css'],
})
export class TwoFactorSetupComponent implements OnInit {
  imgQR: string = ''; // URL para el código QR
  correo: string = ''; // Variable para almacenar el correo del usuario
  codigo: string = ''; // Código ingresado por el usuario

  constructor(
    private usuarioServicio: UsuarioServicioService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el correo del usuario actual
    this.usuarioServicio.obtenerUsuarioActual().subscribe((usuario) => {
      this.correo = usuario?.correo || '';
      
      // Generar el QR automáticamente al cargar el componente
      const loginData: Login = { correo: this.correo, clave: '' };
      this.usuarioServicio.generarQRCode(loginData).subscribe((data: string) => {
        if (data) {
          this.imgQR = data;  // Almacenar la URL del QR
        } else {
          this._snackBar.open('Error al generar el código QR', 'Oops!', {
            duration: 3000,
          });
        }
        // Guarda el HTML de la imagen en `imgQR`
      });
    });
  }

  // Método para validar el código QR
  validarQRCode(): void {
    const loginData: Login = { correo: this.correo, clave: this.codigo };
    this.usuarioServicio.validarQRCode(loginData).subscribe((response) => {
      if (response.status) {
        this._snackBar.open('Código QR validado correctamente', '¡Éxito!', {
          duration: 3000,
        });
        this.router.navigate(['pages']); // Redirige a la siguiente página
      } else {
        this._snackBar.open('Código QR inválido', 'Error', { duration: 3000 });
      }
    });
  }
}
