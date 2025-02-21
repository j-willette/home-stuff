import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileService} from './file.service';
import {Game} from '../models/game.model';
import {GameService, GAME_CONSOLES} from './game.service';

@Injectable({
    providedIn: 'root'
})
export class GameFormService {

    readonly COVER_PATH = 'gamescovers';

    game: Game;
    gameForm: FormGroup;

    consoles = [];

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        private router: Router,
        public fileService: FileService,
    ) {}

    init(game: Game) {
        this.game = game;

        this.gameForm = this.formBuilder.group({
            console: [this.game.console, Validators.required],
            name: [this.game.name, Validators.required],
        });

        this.consoles = GAME_CONSOLES;
    }

    detectFiles(event) {
        this.fileService.onUploadFile(event.target.files[0], this.COVER_PATH);
    }

    save(action) {
        this.game.name = this.gameForm.get('name').value;
        this.game.console = this.gameForm.get('console').value;

        if (this.fileService.url && this.fileService.url !== '') {
            if (this.game.id) {
                this.fileService.removeFile(this.game.cover_internal_ref);
            }

            this.game.cover = this.fileService.url;
            this.game.cover_internal_ref = this.fileService.fileInternalRef;
        }

        if (this.game.id) {
            this.gameService.update(this.game);
        } else {
            this.gameService.create(this.game);

            if (action === 'save') {
                this.router.navigate(['/games']);
            } else {
                this.gameForm.controls['name'].setValue('');
                this.game.id = null;
            }
        }

        this.fileService.clear();
    }
}
