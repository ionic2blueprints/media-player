import {Component, ViewChild} from '@angular/core';
import {Platform, Storage, LocalStorage, NavController, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {FileProvider} from './providers/file-provider/file-provider';
import {UtilProvider} from './providers/util-provider/util-provider';
import {BrowsePage} from './pages/browse/browse';
import {PlayerPage} from './pages/player/player';
import {PlayListPage} from './pages/playlist/playlist';
import {PlayerProvider} from './providers/player-provider/player-provider';

@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  },
  providers: [FileProvider, PlayerProvider, UtilProvider]
})

export class MyApp {
  rootPage: any;
  player:any;
  storage = new Storage(LocalStorage);
  pages:Array<{title:string, component:any}>;
  nav:NavController;
  constructor(platform: Platform, player:PlayerProvider) {
    this.player = player;
    
    platform.ready().then(() => {
      StatusBar.styleDefault();
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

ionicBootstrap(MyApp);
