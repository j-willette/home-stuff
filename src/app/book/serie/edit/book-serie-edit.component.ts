import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookSerie} from '../../../models/book-serie.model';
import {BookSerieFormService} from '../../../services/book-serie-form.service';
import {BookSerieService} from '../../../services/book-serie.service';

@Component({
    selector: 'app-edit',
    templateUrl: './book-serie-edit.component.html',
    styleUrls: ['./book-serie-edit.component.scss']
})
export class BookSerieEditComponent implements OnInit {

    serieId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bookSerieService: BookSerieService,
        public bookSerieFormService: BookSerieFormService,
    ) { }

    ngOnInit() {
        this.bookSerieFormService.init(new BookSerie());

        this.serieId = this.route.snapshot.params['id'];

        this.bookSerieService.get(this.serieId).then(
            (serie: BookSerie) => {
                this.bookSerieFormService.init(serie);
            }
        );
    }

    back() {
        this.router.navigate(['/books/series/' + this.serieId]);
    }
}
