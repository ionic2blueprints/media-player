import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'imClock' })
export class ImClock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    let duration:any = moment.duration(value, args[0]);
    return this.toClock(duration);
  }
  
  toClock(duration) {
      let value:any;
      let seconds = duration.seconds();
      let minutes = duration.minutes();
      let hours = duration.hours();
      value = this.padder(hours) + ":" + this.padder(minutes) + ":" + this.padder(seconds);
      return value;
  }
  
  padder(value) {
      if(value < 10) {
          return "0" + value;
      } else {
          return value.toString();
      }
  }
}