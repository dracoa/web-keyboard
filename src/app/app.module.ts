import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Diablo3Module} from './diablo3/diablo3.module';
import {CommonModule} from '@angular/common';
import {KeyModule} from './key/key.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    Diablo3Module,
    KeyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
