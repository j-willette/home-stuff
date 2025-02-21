import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {ResponsiveService} from '../../services/responsive.service';
import {Cd} from '../../models/cd.model';
import {CdService} from '../../services/cd.service';

@Component({
    selector: 'app-list',
    templateUrl: './cd-list.component.html',
    styleUrls: ['./cd-list.component.scss']
})
export class CdListComponent implements OnInit, OnDestroy {

    cds: Cd[] = [];
    cdsDisplay = {};
    cdsSubscription: Subscription;

    constructor(
        private cdService: CdService,
        private router: Router,
        public responsive: ResponsiveService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    ngOnInit() {
        this.cdsSubscription = this.cdService.cdsSubject.subscribe(
            (cds: Cd[]) => {
                this.cds = cds;

                const tmpCdsDisplay = this.cdsDisplay;

                this.cds.forEach((obj) => {
                    tmpCdsDisplay[obj.name.toString()] = obj;
                });

                Object.keys(tmpCdsDisplay).sort().forEach((key) => {
                    this.cdsDisplay[key] = tmpCdsDisplay[key];
                });
            }
        );
        this.cdService.emit();
    }

    ngOnDestroy() {
        this.cdsSubscription.unsubscribe();
    }

    back() {
        this.router.navigate(['/cds']);
    }
}
