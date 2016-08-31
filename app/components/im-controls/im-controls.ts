import {Component,Output, Input,EventEmitter,OnInit} from '@angular/core';
import {Control} from '@angular/common';
import {ImClock} from '../../pipes/clock';
import {Observable} from 'rxjs/Rx';
import {PlayerProvider} from '../../providers/player-provider/player-provider';
@Component({
    selector: 'im-controls',
    pipes:[ImClock],
    templateUrl: 'build/components/im-controls/im-controls.html'
})

export class ImControls {
    @Input() isPlaylist:Boolean = false;
    @Output() next = new EventEmitter();
    @Output() back = new EventEmitter();
    seekbar:Control = new Control();
    maxSlide:number = 0;
    currentTime = 0;
    isPlaying:Boolean;
    timer:any;
    constructor(public player: PlayerProvider) {}

    ngOnInit() {
        this.reset();
        this.player.getDuration()
        .subscribe(value => {
            this.maxSlide = value;
        });
     }

    playBtn() {
       this.player.play();
       this.isPlaying = true;
       this.startTimer();
    }
    
    pauseBtn() {
        this.player.pause();
        this.isPlaying = false;
        this.stopTimer();
    }

    startTimer() {
        let observable = Observable.interval(1000);
        this.timer = observable.subscribe(() =>{
            this.player.getCurrentPosition()
            .then(value => {
                this.currentTime = value;
                this.seekbar.updateValue(parseInt(value));
            });
        });
    }

    stopTimer() {
        if(this.timer) {
            this.timer.unsubscribe();
        }
    }

    seekTo(event) {
        this.player.seekTo(event.value);
    }

    nextBtn() {
        let value = this.player.next();
        if(value !== -1) {
            this.reset();
            this.next.emit({});
        } else {
            console.log("No More File");
        }
    }

    backBtn() {
        let value = this.player.back();
        if(value !== -1) {
            this.reset();
            this.back.emit({});
        } else {
            console.log("No More File");
        }
    }

    reset() {
        this.player.getDuration()
        .subscribe(value => {
            this.maxSlide = value;
        });
        this.isPlaying = this.player.isPlaying;
        
        this.startTimer();
        this.player.isFinished()
        .then(value => {
            console.log(value);
            this.isPlaying = value;
        });
    }
}