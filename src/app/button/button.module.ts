import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [ButtonComponent],
    exports: [
        ButtonComponent
    ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ButtonModule { }
