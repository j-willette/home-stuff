import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResponsiveService} from '../../services/responsive.service';
import {Video} from '../../models/video.model';
import {VideoService} from '../../services/video.service';

export interface DialogDeleteVideoData {
    video: Video;
}

@Component({
  selector: 'app-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {

    video: Video;

    constructor(
        private route: ActivatedRoute,
        private videoService: VideoService,
        private router: Router,
        public responsive: ResponsiveService,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.video = new Video();
        const id = this.route.snapshot.params['id'];

        this.videoService.get(id).then(
            (video: Video) => {
                this.video = video;
            }
        );
    }

    delete() {
        const dialogRef = this.dialog.open(DeleteVideoDialogComponent, {
            width: '350px',
            data: {video: this.video}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.videoService.remove(this.video);
                this.router.navigate(['/videos']);
            }
        });
    }

    back() {
        this.router.navigate(['/videos']);
    }
}

@Component({
    selector: 'app-delete-video-dialog',
    template: `
        <h1 mat-dialog-title>Suppression d'une vidéo</h1>
        <p>Voulez-vous vraiment supprimer la vidéo <strong>{{ data.video.name }}</strong> ?</p>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()">J'ai changé d'avis</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="data.video.id" cdkFocusInitial>Supprimer</button>
        </div>
    `,
})
export class DeleteVideoDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteVideoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDeleteVideoData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
