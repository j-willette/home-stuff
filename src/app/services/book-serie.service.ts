import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSnapshot} from 'firebase/database';

import {BookSerie} from '../models/book-serie.model';
import {BookSerieBddService} from './bdd.service';

@Injectable()
export class BookSerieService {

    bddPath = '/booksseries';

    series: BookSerie[] = [];
    seriesSubject = new Subject<BookSerie[]>();

    constructor( public bddService: BookSerieBddService) {
        bddService.init(this.bddPath, this.series, this.seriesSubject);
        this.getAll();
    }

    emit() {
        this.bddService.emit();
    }

    getAll() {
        this.bddService.getAll((data: DataSnapshot) => {
            const serie = data.val();

            serie.id = data.key;
            this.series.push(serie);
            this.emit();
        });
    }

    get(id: string) {
        return this.bddService.get(id);
    }

    create(newSerie: BookSerie) {
        this.bddService.create(newSerie);
    }

    update(serie: BookSerie) {
        this.bddService.update(serie);
    }

    remove(serie: BookSerie) {
        this.bddService.remove(serie);
    }
}
