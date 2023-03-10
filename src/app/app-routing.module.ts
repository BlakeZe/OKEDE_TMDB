import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pantalla1Component } from './pantalla1/pantalla1.component';


const routes: Routes = [
  { path: '', redirectTo: '/pantalla-uno', pathMatch: 'full' },
  { path: 'pantalla-1', component: Pantalla1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
