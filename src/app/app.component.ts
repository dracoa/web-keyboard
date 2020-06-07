import {Component, OnInit} from '@angular/core';
import {SerialService} from './serial.service';
import {FormControl, Validators} from '@angular/forms';
import {Profile, Profiles} from './profile/profiles';
import {ProfileService} from './profile/profile.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  supported = false;
  connected = false;
  profiles$: Observable<Profile[]>;
  selectedBtn = null;
  selectedProfile: Profile = null;

  constructor(private serial: SerialService, private profileSvr: ProfileService) {

  }

  selectProfile(evt: any){
    console.log(this.selectedProfile);
  }

  ngOnInit(): void {
    this.supported = this.serial.isSerialSupported;
    if (this.supported) {
      this.serial.connect$.asObservable().subscribe(v => this.connected = v);
      this.profiles$ = this.profileSvr.loadProfiles().pipe(tap((profiles) => {
        setTimeout(() => this.selectedProfile = profiles[0], 500);
      }));
    }
  }

  config(idx: number){
    this.selectedBtn = this.selectedProfile.buttons[idx];
  }

  connect() {
    this.serial.connect().then();
  }

  disconnect() {
    this.serial.disconnect().then();
  }




}
