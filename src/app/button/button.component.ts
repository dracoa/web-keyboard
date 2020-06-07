import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button} from '../profile/profiles';
import {SerialService} from '../serial.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  button: Button;

  code: number;

  firing = false;
  firing$;
  firingSup: Subscription;

  constructor(private serial: SerialService) { }

  ngOnInit(): void {
    if (typeof this.button.control === 'string') {
      this.code = this.button.control.charCodeAt(0);
    }else{
      this.code = this.button.control;
    }
    this.firing$ = interval((this.button.interval ? this.button.interval : 1)  * 1000);
  }

  onPress(){
    switch (this.button.mode) {
      case 'single':
        this.click();
        break;
      case 'interval':
        this.firing = !this.firing;
        if (this.firing){
          this.firingSup = this.firing$.subscribe(() => this.click());
        } else {
          this.firingSup.unsubscribe();
        }
        break;
      case 'long_press':
        this.firing = !this.firing;
        if (this.firing){
          this.serial.keyPress(this.code);
        }else{
          this.serial.keyRelease(this.code);
        }
        break;
      default:
    }
  }

  click(){
    this.serial.keyPress(this.code);
    setTimeout(() => this.serial.keyRelease(this.code), 100);
  }

}
