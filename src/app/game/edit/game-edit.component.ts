import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../services/game.service';
import {GameFormService} from '../../services/game-form.service';
import {Game} from '../../models/game.model';

@Component({
    selector: 'app-edit',
    templateUrl: './game-edit.component.html',
    styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

    gameId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private gameService: GameService,
        public gameFormService: GameFormService,
    ) { }

    ngOnInit() {
        this.gameFormService.init(new Game());

        this.gameId = this.route.snapshot.params['id'];

        this.gameService.get(this.gameId).then(
            (game: Game) => {
                this.gameFormService.init(game);
            }
        );
    }

    back() {
        this.router.navigate(['/games/view/' + this.gameId]);
    }
}
