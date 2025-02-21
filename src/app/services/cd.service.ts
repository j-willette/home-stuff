import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSnapshot} from 'firebase/database';

import {Cd} from '../models/cd.model';
import {CdBddService} from './bdd.service';


@Injectable()
export class CdService {

    readonly BDD_PATH = '/cds';

    cds: Cd[] = [];
    cdsSubject = new Subject<Cd[]>();

    constructor(
        public bddService: CdBddService
    ) {
        bddService.init(this.BDD_PATH, this.cds, this.cdsSubject);
        this.getAll();
    }

    emit() {
        this.bddService.emit();
    }

    getAll() {
        this.bddService.getAll((data: DataSnapshot) => {
            const cd = data.val();

            cd.id = data.key;
            this.cds.push(cd);
            this.emit();
        });
    }

    get(id: string) {
        return this.bddService.get(id);
    }

    create(newCd: Cd) {
        this.bddService.create(newCd);
    }

    update(cd: Cd) {
        this.bddService.update(cd);
    }

    remove(cd: Cd) {
        this.bddService.remove(cd);
    }
}
