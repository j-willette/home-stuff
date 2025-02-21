import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {VideoService, VIDEO_GROUPS} from '../../services/video.service';
import {Video} from '../../models/video.model';
import {ResponsiveService} from '../../services/responsive.service';

@Component({
    selector: 'app-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnDestroy {

    videos: Video[] = [];
    videosDisplay = {};
    videosSubscription: Subscription;

    groups = [];
    currentGroup = '';

    constructor(
        private videoService: VideoService,
        private router: Router,
        private route: ActivatedRoute,
        public responsive: ResponsiveService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    ngOnInit() {
        this.videosSubscription = this.videoService.videosSubject.subscribe(
            (videos: Video[]) => {
                this.videos = videos;

                if ('group' in this.route.snapshot.params) {
                    this.currentGroup = this.route.snapshot.params['group'];

                    const tmpVideos = [];

                    this.videos.forEach((video) => {
                        if ((video.group.toLowerCase() === this.currentGroup)) {
                            tmpVideos.push(video);
                        }
                    });

                    this.videos = tmpVideos;
                }

                const tmpVideosDisplay = this.videosDisplay;

                this.videos.forEach((obj) => {
                    tmpVideosDisplay[obj.name.toString() + obj.medium] = obj;
                });

                Object.keys(tmpVideosDisplay).sort().forEach((key) => {
                    this.videosDisplay[key] = tmpVideosDisplay[key];
                });
            }
        );
        this.videoService.emit();

        this.groups = VIDEO_GROUPS;
    }

    ngOnDestroy() {
        this.videosSubscription.unsubscribe();
    }

    getCurrentGroup() {
        let currentGroup = '';

        if ('group' in this.route.snapshot.params) {
            this.groups.forEach((group) => {
                if ((group.toLowerCase() === this.currentGroup)) {
                    currentGroup = group;
                    return;
                }
            });
        }

        return currentGroup;
    }

    back() {
        this.router.navigate(['/videos']);
    }
}
