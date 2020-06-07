import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Diablo3Component} from './diablo3/diablo3.component';


const routes: Routes = [{
  path: '', component: Diablo3Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
