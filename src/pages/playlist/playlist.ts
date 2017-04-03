import { Component, ViewChild } from '@angular/core';
import { ViewController, NavController, Platform, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PlayerPage } from '../player/player';
import { PlayerProvider } from '../../providers/player-provider/player-provider';

@Component({
  templateUrl: 'playlist.html',
})
export class PlayListPage {
    playlist:any = {};
    @ViewChild('playlist') list: List;
    storage = new Storage();
    constructor(public nav:NavController, public player:PlayerProvider) {}

    ionViewWillEnter() {
        this.storage.get('playlist')
        .then(playlist => {
            console.log(playlist);
            if(playlist) {
                this.playlist = JSON.parse(playlist);
                console.log(this.playlist);
            } 
        });
    }

    play() {
        this.player.startPlaylist();
        this.nav.push(PlayerPage, {type:'playlist'}, {animate:true});
    }

    deleteTrack(index) {
        this.playlist.tracks.splice(index,1);
        this.storage.set('playlist', JSON.stringify(this.playlist));
        this.list.closeSlidingItems();
    }
}