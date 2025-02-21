import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VIDEO_GROUPS, VIDEO_MEDIUMS} from './video.service';
import {Router} from '@angular/router';
import {FileService} from './file.service';
import {Video} from '../models/video.model';
import {VideoService} from './video.service';

@Injectable({
    providedIn: 'root'
})
export class VideoFormService {

    readonly COVER_PATH = 'videoscovers';

    video: Video;
    videoForm: FormGroup;

    groups = [];
    mediums = [];

    constructor(
        private formBuilder: FormBuilder,
        private videoService: VideoService,
        private router: Router,
        public fileService: FileService,
    ) {}

    init(video: Video) {
        this.video = video;

        this.videoForm = this.formBuilder.group({
            medium: [this.video.medium, Validators.required],
            group: [this.video.group, Validators.required],
            name: [this.video.name, Validators.required],
        });

        this.groups = VIDEO_GROUPS;
        this.mediums = VIDEO_MEDIUMS;
    }

    detectFiles(event) {
        this.fileService.onUploadFile(event.target.files[0], this.COVER_PATH);
    }

    save(action) {
        this.video.name = this.videoForm.get('name').value;
        this.video.medium = this.videoForm.get('medium').value;
        this.video.group = this.videoForm.get('group').value;

        if (this.fileService.url && this.fileService.url !== '') {
            if (this.video.id) {
                this.fileService.removeFile(this.video.cover_internal_ref);
            }

            this.video.cover = this.fileService.url;
            this.video.cover_internal_ref = this.fileService.fileInternalRef;
        }

        if (this.video.id) {
            this.videoService.update(this.video);
        } else {
            this.videoService.create(this.video);

            if (action === 'save') {
                this.router.navigate(['/videos']);
            } else {
                this.videoForm.controls['name'].setValue('');
                this.video.id = null;
            }
        }

        this.fileService.clear();
    }
}
