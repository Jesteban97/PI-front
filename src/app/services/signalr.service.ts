import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    private hubConnection!: signalR.HubConnection; // El operador "!" asegura que será inicializada más tarde.
    private messageSource = new Subject<string>(); // Subject para emitir los mensajes

    // Observable que el componente puede suscribirse para recibir mensajes
    public message$ = this.messageSource.asObservable();

    constructor() { }

    public startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.endpoint}/message`, {
                withCredentials: true
            })
            .withAutomaticReconnect() // Habilitar reconexión automática
            .build();
        this.hubConnection.serverTimeoutInMilliseconds = 100000;
        this.hubConnection
            .start()
            .then(() => console.log('Conexión de SignalR iniciada'))
            .catch(err => console.log('Error al iniciar la conexión de SignalR: ', err));
    }

    public addNotificationListener() {
        if (this.hubConnection) {
            this.hubConnection.on('send', (mensaje) => {
                // Emitimos el mensaje recibido a través del Subject
                this.messageSource.next(mensaje);
            });
        }
    }
}
