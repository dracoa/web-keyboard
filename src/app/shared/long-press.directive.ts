import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {of, race, Subject, timer} from 'rxjs';
import {concatMap, take} from 'rxjs/operators';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {

  @Output()
  longPress = new EventEmitter();
  @Output()
  shortClick = new EventEmitter();
  // @Output()
  // dragOut = new EventEmitter();

  threshold = 1000;
  end$ = new Subject<any>();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  startPress(event) {
   of(event).pipe(
     concatMap(() => race(timer(this.threshold), this.end$)),
     take(1),
   ).subscribe((v) => {
        if (v instanceof MouseEvent || v instanceof TouchEvent) {
         this.shortClick.emit(v);
       } else {
         this.longPress.emit(event);
       }
     });
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  endPress(event) {
    this.end$.next(event);
  }

  /*
  @HostListener('touchmove', ['$event'])

  mouseLeave(event) {
    console.log(event);
    this.dragOut.emit(event);
  }
 */

}
