import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FileProvider } from '../providers/file-provider/file-provider';
import { UtilProvider } from '../providers/util-provider/util-provider';
import { BrowsePage } from '../pages/browse/browse';
import { PlayerPage } from '../pages/player/player';
import { PlayListPage } from '../pages/playlist/playlist';
import { PlayerProvider } from '../providers/player-provider/player-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  storage = new Storage();
  pages:Array<{title:string, component:any}>;
  @ViewChild('content') nav:NavController;

  constructor(public player:PlayerProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) { 
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.storage.get('current')
      .then(current => {
        current = JSON.parse(current);
        if(current === null) {
          this.rootPage = BrowsePage;
        } else if(current.type === "single") {
          let url = current.file.nativeURL;
          this.player.initialize(url);
          this.rootPage = PlayerPage;
        } else {
          this.player.initializePlaylist();
          this.rootPage = PlayerPage;
        }      
      });
    });
    
    this.pages = [
      {title: 'Playing', component: PlayerPage},
      {title: 'Browse', component: BrowsePage},
      {title: 'Playlist', component: PlayListPage}
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  } 
}
