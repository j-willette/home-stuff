import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cd} from '../../models/cd.model';
import {CdFormService} from '../../services/cd-form.service';

@Component({
    selector: 'app-new',
    templateUrl: './cd-new.component.html',
    styleUrls: ['./cd-new.component.scss']
})
export class CdNewComponent implements OnInit {

    constructor(
        public cdFormService: CdFormService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.cdFormService.init(new Cd());
    }

    back() {
        this.router.navigate(['/cds']);
    }
}
