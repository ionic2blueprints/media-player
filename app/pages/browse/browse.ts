import {Component} from '@angular/core';
import {LocalStorage,Storage, NavController, Platform, NavParams} from 'ionic-angular';
import {FileProvider} from '../../providers/file-provider/file-provider';
import {PlayerPage} from '../player/player';
import {PlayerProvider} from '../../providers/player-provider/player-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';

declare var window:any;
@Component({
  templateUrl: 'build/pages/browse/browse.html',
})
export class BrowsePage {
  file:string;
  path:string;
  files:any;
  storage = new Storage(LocalStorage);
  constructor(public nav:NavController, 
  public fp:FileProvider, 
  public player: PlayerProvider, 
  public platform: Platform, 
  public params: NavParams, 
  public util:UtilProvider) {
    this.path = params.get('path');   
    
    platform.ready()
    .then(() => {
      let loader = this.util.getLoader();
      this.nav.present(loader);
      this.fp.getEntries(this.path)
      .then(content => {
        this.files = content;
        loader.dismiss();
      })
      .catch(error => {
        console.log("File system error", error);
      });
    });
    
  };
  
  open(file) {
    this.file = file;
    this.storage.set('current', JSON.stringify({file:file, type:"single"}));
    this.player.play(file.nativeURL, false);
    this.nav.push(PlayerPage, {type:'single'});
  }

  openDocument(file) {
    this.nav.push(BrowsePage, {path: file.nativeURL}, {animate: true});
  }

  openVideo(file) {
    let url = file.nativeURL;
    let options = {
      successCallback: function() {
        console.log("Video was closed without error.");
      },
      errorCallback: function(errMsg) {
        console.log("Error! " + errMsg);
      },
      orientation: 'landscape'
    };
    window.plugins.streamingMedia.playVideo(url,options);
  }

  addToPlaylist(file) {
    let value = this.player.addToPlayList(file);
    let message;
    if(value === -1) {
      message = "Track is Already in Playlist."
    } else {
      message = "Track is Added to Playlist";
    }

    let toast = this.util.getToast(message);
    this.nav.present(toast);
  }

  isAudio(file) {
    let ext = file.name.split(".").pop();
    return this.player.isAudio(ext);
  }

  isVideo(file) {
    let ext = file.name.split(".").pop();
    return this.player.isVideo(ext);
  }
}
