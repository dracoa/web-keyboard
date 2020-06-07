import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyComponent } from './key.component';



@NgModule({
    declarations: [KeyComponent],
    exports: [
        KeyComponent
    ],
    imports: [
        CommonModule
    ]
})
export class KeyModule { }
