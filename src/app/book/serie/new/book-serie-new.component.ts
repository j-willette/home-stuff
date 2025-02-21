import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookSerie} from '../../../models/book-serie.model';
import {BookSerieFormService} from '../../../services/book-serie-form.service';

@Component({
    selector: 'app-new',
    templateUrl: './book-serie-new.component.html',
    styleUrls: ['./book-serie-new.component.scss']
})
export class BookSerieNewComponent implements OnInit {

    constructor(
        private router: Router,
        public bookSerieFormService: BookSerieFormService,
    ) { }

    ngOnInit() {
        this.bookSerieFormService.init(new BookSerie());
    }

    back() {
        this.router.navigate(['/books']);
    }
}
