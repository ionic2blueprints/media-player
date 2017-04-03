import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';
import { MyApp } from './app.component';

import { BrowsePage } from '../pages/browse/browse';
import { PlayerPage } from '../pages/player/player';
import { PlayListPage } from '../pages/playlist/playlist';

import { ImControls } from '../components/im-controls/im-controls';
import { ImClock } from '../pipes/clock';

import { FileProvider } from '../providers/file-provider/file-provider';
import { PlayerProvider } from '../providers/player-provider/player-provider';
import { UtilProvider } from '../providers/util-provider/util-provider';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ImControls,
    ImClock,
    BrowsePage,
    PlayerPage,
    PlayListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ImControls,
    BrowsePage,
    PlayerPage,
    PlayListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileProvider,
    PlayerProvider,
    UtilProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
