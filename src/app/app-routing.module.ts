import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage/mainpage.component';
import { StarterpageComponent } from './starterpage/starterpage/starterpage.component';
import {LoginComponent} from './starterpage/login/login.component';
import {AuthGuard} from './starterpage/login/auth.guard';
import {GalleryComponent} from './mainpage/gallery/gallery.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'starter-page', component: StarterpageComponent, canActivate: [AuthGuard]},
  { path: 'main-page', component: MainpageComponent, canActivate: [AuthGuard] },
  { path: 'gallery-page', component: GalleryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
