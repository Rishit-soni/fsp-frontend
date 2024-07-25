import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input('time') oldTime;
  constructor() {}
  time;
  ngOnInit(): void {
    let currentTime = moment().format('HH:mm:ss');
    console.log(currentTime, this.oldTime)
    this.time = moment
      .utc(
        moment(currentTime, 'HH:mm:ss').diff(
          moment(this.oldTime, 'HH:mm:ss')
        )
      )
      .format('HH:mm:ss');
    this.startTimer();
  }

  stopWatch: Subscription;
  startTimer = () => {
    this.stopWatch = timer(0, 1000).subscribe((val) => {
      if(this.time == '00:00:00'){
        this.time = '00:00:01'
      }else{
        this.time = moment(this.time, 'HH:mm:ss')
        .add(1, 'seconds')
        .format('HH:mm:ss');
      }
      
    });
  };

  ngOnDestroy() {
    this.stopWatch.unsubscribe();
  }
}
