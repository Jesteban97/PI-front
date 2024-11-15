import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReusableModule } from './components/reusable/reusable.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TwoFactorSetupComponent } from './components/two-factor-setup/two-factor-setup.component';
import { TwoFactorCodeComponent } from './components/two-factor-code/two-factor-code.component'

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    TwoFactorSetupComponent,
    TwoFactorCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ReusableModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
