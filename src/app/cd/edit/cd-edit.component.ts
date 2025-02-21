import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cd} from '../../models/cd.model';
import {CdService} from '../../services/cd.service';
import {CdFormService} from '../../services/cd-form.service';

@Component({
    selector: 'app-edit',
    templateUrl: './cd-edit.component.html',
    styleUrls: ['./cd-edit.component.scss']
})
export class CdEditComponent implements OnInit {

    cdId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cdService: CdService,
        public cdFormService: CdFormService,
    ) { }

    ngOnInit() {
        this.cdFormService.init(new Cd());

        this.cdId = this.route.snapshot.params['id'];

        this.cdService.get(this.cdId).then(
            (cd: Cd) => {
                this.cdFormService.init(cd);
            }
        );
    }

    back() {
        this.router.navigate(['/cds/view/' + this.cdId]);
    }
}
