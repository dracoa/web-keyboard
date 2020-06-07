import { Component } from '@angular/core';
import {SerialService} from './serial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  supported = false;
  connected = false;
  constructor(private serial: SerialService) {
    this.supported = this.serial.isSerialSupported;
    if (this.supported) {
      this.serial.connect$.asObservable().subscribe(v => this.connected = v);
    }
  }
  connect() {
    this.serial.connect().then();
  }

  disconnect() {
    this.serial.disconnect().then();
  }
}
