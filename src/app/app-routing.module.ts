import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TwoFactorCodeComponent } from './components/two-factor-code/two-factor-code.component';
import { TwoFactorSetupComponent } from './components/two-factor-setup/two-factor-setup.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'two-factor-code', component: TwoFactorCodeComponent },
  { path: 'two-factor-setup', component: TwoFactorSetupComponent },
  { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(x => x.PagesModule) },
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
