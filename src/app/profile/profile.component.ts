import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button, ButtonMode, Profile} from './profiles';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  profile: Profile;

  @Input()
  button: Button;

  @Output()
  close = new EventEmitter();

  form = new FormGroup({
    display: new FormControl(null, Validators.required),
    control: new FormControl(null, Validators.required),
    mode: new FormControl(null, Validators.required),
    interval: new FormControl(null, Validators.required),
    hint: new FormControl(null, Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
    console.log(this.button);
    this.form.patchValue(this.button);
  }

  onClose(){
    this.close.emit();
  }

}
