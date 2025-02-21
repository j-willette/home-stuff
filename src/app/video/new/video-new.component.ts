import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VideoFormService} from '../../services/video-form.service';
import {Video} from '../../models/video.model';

@Component({
    selector: 'app-new',
    templateUrl: './video-new.component.html',
    styleUrls: ['./video-new.component.scss']
})
export class VideoNewComponent implements OnInit {

    constructor(
        public videoFormService: VideoFormService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.videoFormService.init(new Video());
    }

    back() {
        this.router.navigate(['/videos']);
    }
}
