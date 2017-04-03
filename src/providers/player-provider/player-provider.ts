import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MediaPlugin } from 'ionic-native';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PlayerProvider {
    file:any;
    public url:String;
    public isPlaying:Boolean = false;
    isPlaylist:Boolean;;
    storage = new Storage();
    playlist:{tracks:Array<any>, current:number};

    constructor() {
        this.storage.get('playlist')
        .then(playlist => {
            if(playlist === null) {
                this.playlist = {tracks:[], current:null}
            } else {
                this.playlist = JSON.parse(playlist);
            }
        });
    }
    
    play(url?, isPlaylist = false) {
        this.isPlaylist = isPlaylist;
        // If file is already playing
        if(this.isPlaying) {
            this.stop();
        } 
        // If a new file is given to play
        if(url) {
           this.initialize(url);
        }
        this.file.play();
        this.isPlaying = true;
    }

    isFinished() {
        return this.file.init.then(() => {
            return this.isPlaying = false;
        });
    }

    initialize(file) {
        this.url = file;
        this.file = new MediaPlugin(file);
    }

    pause() {
        this.file.pause();
        this.isPlaying = false;
    }

    stop() {
        if(this.file) {
            this.file.pause();
           // this.file.release();
        }
        this.isPlaying = false;
    }

    seekTo(seconds) {
        let milli = seconds * 1000;
        this.file.seekTo(milli);
    }

    initializePlaylist() {
        this.storage.set('current', JSON.stringify({type:'playlist'}));
        if(!this.playlist.current) {
            this.playlist.current = 0;
        }
        let file = this.playlist.tracks[this.playlist.current].nativeURL;
        this.initialize(file);
        this.isPlaylist = true;
    }

    startPlaylist() {
        this.stop();
        this.initializePlaylist();
        this.play(null,true);
    }
    
    getDuration() {
        let obs = Observable.interval(200).flatMap(value => {
            value = this.file.getDuration();
            return Observable.of(value);
        })
        .filter(value => value > 0)
        .take(1);
        return obs;
    }

    getCurrentPosition() {
        return this.file.getCurrentPosition();
    }

    isAudio(ext) {
        let audioExt = ["mp3", "ogg", "amr", "wma", "m4a"];
        return audioExt.indexOf(ext) !== -1? true:false;
    }

    isVideo(ext) {
        let videoExt = ["mp4"];
        return videoExt.indexOf(ext) !== -1? true:false;
    }

    addToPlayList(file) {
      let index = this.playlist.tracks.map(value => value.nativeURL).indexOf(file.nativeURL);
      if(index < 0) {
        this.playlist.tracks.push(file);
        this.storage.set('playlist', JSON.stringify(this.playlist));
      } else {
          return -1;
      }
    }

    next() {
        if(this.playlist.current < this.playlist.tracks.length - 1) {
            this.stop();
            this.playlist.current++;
            let url = this.playlist.tracks[this.playlist.current].nativeURL;
            this.play(url, true);
            this.storage.set('playlist', JSON.stringify(this.playlist));
        } else {
            return -1;
        }
       
    }

    back() {
        if(this.playlist.current > 0) {
            this.stop();
            this.playlist.current--;
            let url = this.playlist.tracks[this.playlist.current].nativeURL;
            this.play(url, true);
            this.storage.set('playlist', JSON.stringify(this.playlist));
        } else {
            return -1;
        }
    }

    getFileName() {
        let promise = new Promise((res, rej) => {
            if(this.isPlaylist) {
                let current = this.playlist.current;
                res(this.playlist.tracks[current].name);
            } else {
                this.storage.get('current')
                .then(current => {
                    if(current) {
                        current = JSON.parse(current);
                        res(current.file.name);
                    } else {
                        res(null);
                    }
                    
                });
            }
        });

        return promise;
    }
}