import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResponsiveService} from '../../services/responsive.service';
import {Cd} from '../../models/cd.model';
import {CdService} from '../../services/cd.service';

export interface DialogDeleteCdData {
    cd: Cd;
}

@Component({
  selector: 'app-view',
  templateUrl: './cd-view.component.html',
  styleUrls: ['./cd-view.component.scss']
})
export class CdViewComponent implements OnInit {

    cd: Cd;

    constructor(
        private route: ActivatedRoute,
        private cdService: CdService,
        private router: Router,
        public responsive: ResponsiveService,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.cd = new Cd();
        const id = this.route.snapshot.params['id'];

        this.cdService.get(id).then(
            (cd: Cd) => {
                this.cd = cd;
            }
        );
    }

    delete() {
        const dialogRef = this.dialog.open(DeleteCdDialogComponent, {
            width: '350px',
            data: {cd: this.cd}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.cdService.remove(this.cd);
                this.router.navigate(['/cds']);
            }
        });
    }

    back() {
        this.router.navigate(['/cds']);
    }
}

@Component({
    selector: 'app-delete-cd-dialog',
    template: `
        <h1 mat-dialog-title>Suppression d'un CD</h1>
        <p>Voulez-vous vraiment supprimer le CD <strong>{{ data.cd.name }}</strong> ?</p>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()">J'ai changé d'avis</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="data.cd.id" cdkFocusInitial>Supprimer</button>
        </div>
    `,
})
export class DeleteCdDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteCdDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDeleteCdData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
