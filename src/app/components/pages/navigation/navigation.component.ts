import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SignalrService } from 'src/app/services/signalr.service';
import { UsuarioServicioService } from 'src/app/services/usuario-servicio.service';
// Importa el servicio de SignalR

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  usuarioActual: any = null; // Almacena el usuario actual
  constructor(
    private breakpointObserver: BreakpointObserver,
    private signalrService: SignalrService,  // Inyecta el servicio de SignalR
    private _usuarioServicio: UsuarioServicioService
  ) { }

  ngOnInit(): void {
    // Iniciar la conexión de SignalR cuando el componente se inicialice
    this.signalrService.startConnection();

    // Escuchar las notificaciones de ventas registradas
    this.signalrService.addNotificationListener();

    this.signalrService.message$.subscribe(mensaje => {
      console.log(mensaje)
      if (this.usuarioActual.rolDescripcion == "Administrador") {
        alert(`Nueva venta registrada: ${mensaje.toString()}`);  // Mostrar un alert con el mensaje
      }
    });

    this._usuarioServicio.obtenerUsuarioActual().subscribe((usuario) => {
      console.log(usuario)
      this.usuarioActual = usuario;
    });

  }
}
