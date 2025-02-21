import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {DataSnapshot} from 'firebase/database';
import {FileService} from './file.service';

@Injectable({
    providedIn: 'root'
})
export class BddService {

    bddPath: string;
    collection;
    objectSubject;

    constructor(
        private fileService: FileService,
    ) { }

    init(bddPath: string, collection, objectSubject) {
        this.bddPath = bddPath;
        this.collection = collection;
        this.objectSubject = objectSubject;
    }

    get(id: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref(this.bddPath + '/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    getAll(callback) {
        firebase.database()
            .ref(this.bddPath)
            .orderByChild('name')
            .on('child_added', (data: DataSnapshot) => {
                callback(data);
            });
    }

    create(newObject) {
        newObject.id = firebase.database().ref(this.bddPath).push().key;

        this.update(newObject);
    }

    update(object) {
        const updates = {};

        updates[this.bddPath + '/' + object.id] = object;

        firebase.database().ref().update(updates);

        this.emit();
    }

    remove(object) {
        const objectIndexToRemove = this.collection.findIndex(
            (objectEl) => {
                if (objectEl === object) {
                    return true;
                }
            }
        );

        this.collection.splice(objectIndexToRemove, 1);

        if (object.cover_internal_ref) {
            this.fileService.removeFile(object.cover_internal_ref);
        }

        firebase.database().ref(this.bddPath).child(object.id).remove();

        this.emit();
    }

    emit() {
        this.objectSubject.next(this.collection);
    }
}

@Injectable()
export class BookBddService extends BddService {}

@Injectable()
export class BookSerieBddService extends BddService {}

@Injectable()
export class GameBddService extends BddService {}

@Injectable()
export class VideoBddService extends BddService {}

@Injectable()
export class CdBddService extends BddService {}
