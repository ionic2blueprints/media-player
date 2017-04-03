import { Injectable } from '@angular/core';
import { File } from 'ionic-native';
import 'rxjs/add/operator/map';
declare var cordova:any;
declare var window:any;

@Injectable()
export class FileProvider {
  root:string;
  getEntries(root = cordova.file.externalRootDirectory) {
   let promise = new Promise((resolve, reject) => {  
      window.resolveLocalFileSystemURL(root, (entry)=> {
          let directoryReader = entry.createReader();
          directoryReader.readEntries(entries => {
            entries.sort(function(a,b) {
              if(a.isDirectory && !b.isDirectory) {
                return -1;
              } else if(!a.isDirectory && b.isDirectory) {
                return 1;
              }
              return 0;
            });
            
            resolve(entries);
          }, error => {
            reject(error);
          });
        }, (error) => {
          reject(error);
        });
   });
   return promise;
  }
}

