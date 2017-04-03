import { Component } from '@angular/core';
import { ImControls } from '../../components/im-controls/im-controls';
import { PlayerProvider } from '../../providers/player-provider/player-provider';
@Component({
    templateUrl: 'player.html'
})
export class PlayerPage {
    isPlaylist:Boolean;
    name:any;
    constructor(public player:PlayerProvider) {
        this.isPlaylist = this.player.isPlaylist;
    }

    ionViewWillEnter() {
        this.getFileName();
    }

    getFileName() {
        this.player.getFileName()
        .then(name => {
            this.name = name;
        });
    }
    
}