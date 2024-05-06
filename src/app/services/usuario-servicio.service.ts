import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';
import { Login } from '../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {
  apiBase: string = '/api/usuario/'
  constructor(private http: HttpClient) {
  }

iniciarSesion(request:Login): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.apiBase}IniciarSesion`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' }})
  }

  getUsuarios(): Observable<ResponseApi> {

    return this.http.get <ResponseApi>(`${this.apiBase}Lista`)

  }

  saveUsuario(request:Usuario): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.apiBase}Guardar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' }})

  }

  editUsuario(request: Usuario): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(`${this.apiBase}Editar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

deleteUsuario(id: number): Observable<ResponseApi> {

    return this.http.delete<ResponseApi>(`${this.apiBase}Eliminar/${id}`);

  }
}
