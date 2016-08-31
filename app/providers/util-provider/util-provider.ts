import { Injectable } from '@angular/core';
import { Toast, Loading } from 'ionic-angular';

@Injectable()
export class UtilProvider {
    getLoader(content="Loading...") {
        let loading = Loading.create({
            content: content,
            duration: 3000
        });
        return loading;
    }

    getToast(message) {
        let toast = new Toast({
            message: message,
            duration:1000
        });
        return toast;
    }
}