import {Component, Input, OnInit} from '@angular/core';
import {SerialService} from '../serial.service';
import {from, interval, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  @Input()
  code: number;
  @Input()
  text: string;
  mode = 'single';
  interval = 1;
  pressSup: Subscription;
  releaseSup: Subscription;

  constructor(private serial: SerialService) { }

  ngOnInit(): void {
    this.code = +this.code;
    if (!this.code){ // when not setting code directly
      if (this.text === 'LM') {
        this.code = 21;
      } else if (this.text === 'RM') {
        this.code = 22;
      } else{
        this.code = this.text.charCodeAt(0);
      }
    } else {
      if (!this.text){
        this.text = String.fromCharCode(this.code);
      }
    }
  }

  toggleInterval(){
    if (this.mode === 'interval') {
      this.release();
    } else {
      this.mode = 'interval';
      const press = interval(this.interval * 1000);
      this.pressSup = press.subscribe(() =>  this.send());
      this.releaseSup = from(press).pipe(delay(100)).subscribe(() => this.send(1));
    }
  }

  toggleLock(){
    if (this.mode === 'lock'){
      this.release();
    }else {
      this.mode = 'lock';
      this.send();
    }
  }

  press(){
    this.send();
    this.mode = 'single';
  }

  release(){
    this.send(1);
    if (this.pressSup) {
      this.pressSup.unsubscribe();
    }
    if (this.releaseSup) {
      this.releaseSup.unsubscribe();
    }
    this.mode = 'single';
  }

  send(type = 0){
    this.serial.send(this.code + (type * 128));
  }

  addInterval(inc: number){
    this.interval += inc;
  }

}
