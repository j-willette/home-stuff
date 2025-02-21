import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {ResponsiveService} from '../../services/responsive.service';
import {Game} from '../../models/game.model';
import {GameService, GAME_CONSOLES} from '../../services/game.service';

@Component({
    selector: 'app-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

    games: Game[] = [];
    gamesDisplay = {};
    gamesSubscription: Subscription;

    consoles = [];
    currentGroup = '';

    constructor(
        private gameService: GameService,
        private router: Router,
        private route: ActivatedRoute,
        public responsive: ResponsiveService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    ngOnInit() {
        this.gamesSubscription = this.gameService.gamesSubject.subscribe(
            (games: Game[]) => {
                this.games = games;

                if ('console' in this.route.snapshot.params) {
                    this.currentGroup = this.route.snapshot.params['console'];

                    const tmpGames = [];

                    this.games.forEach((game) => {
                        if ((game.console.toLowerCase() === this.currentGroup)) {
                            tmpGames.push(game);
                        }
                    });

                    this.games = tmpGames;
                }

                const tmpGamesDisplay = this.gamesDisplay;

                this.games.forEach((obj) => {
                    tmpGamesDisplay[obj.name.toString()] = obj;
                });

                Object.keys(tmpGamesDisplay).sort().forEach((key) => {
                    this.gamesDisplay[key] = tmpGamesDisplay[key];
                });
            }
        );
        this.gameService.emit();

        this.consoles = GAME_CONSOLES;
    }

    ngOnDestroy() {
        this.gamesSubscription.unsubscribe();
    }

    getCurrentGroup() {
        let currentGroup = '';

        if ('console' in this.route.snapshot.params) {
            this.consoles.forEach((group) => {
                if ((group.toLowerCase() === this.currentGroup)) {
                    currentGroup = group;
                    return;
                }
            });
        }

        return currentGroup;
    }

    back() {
        this.router.navigate(['/games']);
    }
}
