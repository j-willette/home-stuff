import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Book} from '../../models/book.model';
import {BookFormService} from '../../services/book-form.service';

@Component({
    selector: 'app-new',
    templateUrl: './book-new.component.html',
    styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {

    constructor(
        public bookFormService: BookFormService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.bookFormService.init(new Book());
    }

    back() {
        this.router.navigate(['/books']);
    }
}
