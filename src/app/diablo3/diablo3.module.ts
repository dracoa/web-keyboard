import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Diablo3Component } from './diablo3.component';
import {KeyModule} from '../key/key.module';



@NgModule({
  declarations: [Diablo3Component],
  imports: [
    CommonModule,
    KeyModule
  ]
})
export class Diablo3Module { }
