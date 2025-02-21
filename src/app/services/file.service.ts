import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    isUploading = false;
    uploaded = false;
    url: string;
    fileInternalRef: string;

    constructor() {
    }

    clear() {
        this.url = '';
        this.isUploading = false;
        this.uploaded = false;
        this.fileInternalRef = '';
    }

    onUploadFile(file: File, path) {
        this.isUploading = true;
        this.uploadFile(file, path).then(
            (result: any) => {
                this.url = result.url;
                this.isUploading = false;
                this.uploaded = true;
                this.fileInternalRef = result.fileInternalRef;
            }
        );
    }

    uploadFile(file: File, path) {
        return new Promise(
            (resolve, reject) => {
                const filename = Date.now().toString();
                const fileInternalRef = path + '/' + filename + file.name;
                const upload = firebase.storage().ref().child(fileInternalRef).put(file);

                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement...');
                    },
                    (error) => {
                        console.log('Erreur de chargement ! : ' , error);
                        reject();
                    },
                    () => {
                        upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            resolve({
                                url: downloadURL,
                                fileInternalRef: fileInternalRef,
                            });
                        });
                    }
                );
            }
        );
    }

    removeFile(fileInternalRef) {
        if (fileInternalRef !== '') {
            firebase.storage().ref().child(fileInternalRef).delete();
        }
    }
}
