import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/login';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {
  apiBase: string = `${environment.endpoint}/usuario/`;
  
  // BehaviorSubject para almacenar el usuario actual
  private usuarioActual = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  iniciarSesion(request: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiBase}IniciarSesion`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
      .pipe(
        tap(response => {
          if (response.status) {
            // Si el inicio de sesión es exitoso, almacena los datos del usuario
            this.usuarioActual.next(response.value);
          }
        })
      );
  }

  // Método para obtener el usuario actual
  obtenerUsuarioActual(): Observable<any> {
    return this.usuarioActual.asObservable();
  }

  getUsuarios(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBase}Lista`);
  }

  saveUsuario(request: Usuario): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiBase}Guardar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
  }

  editUsuario(request: Usuario): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.apiBase}Editar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } });
  }

  deleteUsuario(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.apiBase}Eliminar/${id}`);
  }

   // Método para generar el código QR
   generarQRCode(request: Login): Observable<string> {
    return this.http.post(`${this.apiBase}GetQRCode`, request, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      responseType: 'text' // Cambia el tipo de respuesta a texto en lugar de JSON
    });
  }

  // Método para validar el código QR
  validarQRCode(request: Login): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.apiBase}ValidarQRCode`, 
      request,
      { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
    );
  }
}
