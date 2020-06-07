import { Injectable } from '@angular/core';
import {Profile, Profiles} from './profiles';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  loadProfiles(): Observable<Profile[]>{
    return of(Profiles);
  }

}
