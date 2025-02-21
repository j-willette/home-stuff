import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSnapshot} from 'firebase/database';

import {Video} from '../models/video.model';
import {VideoBddService} from './bdd.service';

export const VIDEO_MEDIUMS = [
    'DVD',
    'Blu-Ray',
];

export const VIDEO_GROUPS = [
    'Films',
    'Séries',
    'Anime',
];

@Injectable()
export class VideoService {

    readonly BDD_PATH = '/videos';

    videos: Video[] = [];
    videosSubject = new Subject<Video[]>();

    groups = [];

    constructor(
        public bddService: VideoBddService
    ) {
        bddService.init(this.BDD_PATH, this.videos, this.videosSubject);
        this.getAll();
    }

    emit() {
        this.bddService.emit();
    }

    getAll() {
        this.bddService.getAll((data: DataSnapshot) => {
            const video = data.val();

            video.id = data.key;
            this.videos.push(video);
            this.emit();

            this.groups.push(video.group);
            this.groups = this.groups.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        });
    }

    get(id: string) {
        return this.bddService.get(id);
    }

    create(newVideo: Video) {
        this.bddService.create(newVideo);
    }

    update(video: Video) {
        this.bddService.update(video);
    }

    remove(video: Video) {
        this.bddService.remove(video);
    }
}
