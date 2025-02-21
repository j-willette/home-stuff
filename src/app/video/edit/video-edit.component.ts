import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Video} from '../../models/video.model';
import {VideoService} from '../../services/video.service';
import {VideoFormService} from '../../services/video-form.service';

@Component({
    selector: 'app-edit',
    templateUrl: './video-edit.component.html',
    styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent implements OnInit {

    videoId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private videoService: VideoService,
        public videoFormService: VideoFormService,
    ) { }

    ngOnInit() {
        this.videoFormService.init(new Video());

        this.videoId = this.route.snapshot.params['id'];

        this.videoService.get(this.videoId).then(
            (video: Video) => {
                this.videoFormService.init(video);
            }
        );
    }

    back() {
        this.router.navigate(['/videos/view/' + this.videoId]);
    }
}
