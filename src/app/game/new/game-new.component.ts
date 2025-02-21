import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameFormService} from '../../services/game-form.service';
import {Game} from '../../models/game.model';

@Component({
    selector: 'app-new',
    templateUrl: './game-new.component.html',
    styleUrls: ['./game-new.component.scss']
})
export class GameNewComponent implements OnInit {

    constructor(
        public gameFormService: GameFormService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.gameFormService.init(new Game());
    }

    back() {
        this.router.navigate(['/games']);
    }
}
