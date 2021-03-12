import { IsloggedInService } from './core/services/islogged-in.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => AuthModule),
    canActivate: [IsloggedInService],
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => PagesModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
