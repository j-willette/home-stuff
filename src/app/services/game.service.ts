import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSnapshot} from 'firebase/database';

import {Game} from '../models/game.model';
import {GameBddService} from './bdd.service';

export const GAME_CONSOLES = [
    'PS3',
    'PS2',
    'PS1',
    'Wii',
    'Nintendo',
    'PC',
];

@Injectable()
export class GameService {

    readonly BDD_PATH = '/games';

    games: Game[] = [];
    gamesSubject = new Subject<Game[]>();

    consoles = [];

    constructor(
        public bddService: GameBddService
    ) {
        bddService.init(this.BDD_PATH, this.games, this.gamesSubject);
        this.getAll();
    }

    emit() {
        this.bddService.emit();
    }

    getAll() {
        this.bddService.getAll((data: DataSnapshot) => {
            const game = data.val();

            game.id = data.key;
            this.games.push(game);
            this.emit();

            this.consoles.push(game.console);
            this.consoles = this.consoles.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        });
    }

    get(id: string) {
        return this.bddService.get(id);
    }

    create(newGame: Game) {
        this.bddService.create(newGame);
    }

    update(game: Game) {
        this.bddService.update(game);
    }

    remove(game: Game) {
        this.bddService.remove(game);
    }
}
