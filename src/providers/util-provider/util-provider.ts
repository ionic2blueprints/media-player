import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilProvider {
    constructor(public toastCtrl:ToastController, public loadingCtrl:LoadingController) {}
    getLoader(content="Loading...") {
        let loading = this.loadingCtrl.create({
            content: content,
            duration: 3000
        });
        return loading;
    }

    getToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration:1000
        });
        return toast;
    }
}