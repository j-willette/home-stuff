import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResponsiveService} from '../../services/responsive.service';
import {Game} from '../../models/game.model';
import {GameService} from '../../services/game.service';

export interface DialogDeleteGameData {
    game: Game;
}

@Component({
  selector: 'app-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

    game: Game;

    constructor(
        private route: ActivatedRoute,
        private gameService: GameService,
        private router: Router,
        public responsive: ResponsiveService,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.game = new Game();
        const id = this.route.snapshot.params['id'];

        this.gameService.get(id).then(
            (game: Game) => {
                this.game = game;
            }
        );
    }

    delete() {
        const dialogRef = this.dialog.open(DeleteGameDialogComponent, {
            width: '350px',
            data: {game: this.game}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.gameService.remove(this.game);
                this.router.navigate(['/games']);
            }
        });
    }

    back() {
        this.router.navigate(['/games']);
    }
}

@Component({
    selector: 'app-delete-game-dialog',
    template: `
        <h1 mat-dialog-title>Suppression d'un jeu</h1>
        <p>Voulez-vous vraiment supprimer le jeu <strong>{{ data.game.name }}</strong> ?</p>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()">J'ai changé d'avis</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="data.game.id" cdkFocusInitial>Supprimer</button>
        </div>
    `,
})
export class DeleteGameDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteGameDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDeleteGameData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
