import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialService implements OnDestroy {

  public output$ = new Subject();
  public connect$ = new BehaviorSubject(false);
  public isSerialSupported: boolean;
  private port: any;


  constructor() {
    this.isSerialSupported = 'serial' in navigator;
  }

  async connect() {
    this.port = await (navigator as any).serial.requestPort();
    await this.port.open({baudrate: 9600});
    this.connect$.next(true);
  }

  send(code: number) {
    if (this.port && this.port.writable) {
      const writer = this.port.writable.getWriter();
      writer.write(new Uint8Array([code]));
      writer.releaseLock();
    }else{
      console.log(code);
    }
  }

  async disconnect() {
    if (this.port) {
      await this.port.close();
      this.port = null;
    }
    this.connect$.next(false);
  }

  ngOnDestroy(): void {
    this.disconnect().then();
  }
}
