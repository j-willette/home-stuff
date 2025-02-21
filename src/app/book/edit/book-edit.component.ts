import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book.model';
import {BookFormService} from '../../services/book-form.service';

@Component({
    selector: 'app-edit',
    templateUrl: './book-edit.component.html',
    styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

    bookId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private booksService: BookService,
        public bookFormService: BookFormService,
    ) { }

    ngOnInit() {
        this.bookFormService.init(new Book());

        this.bookId = this.route.snapshot.params['id'];

        this.booksService.get(this.bookId).then(
            (book: Book) => {
                this.bookFormService.init(book);
            }
        );
    }

    back() {
        this.router.navigate(['/books/view/' + this.bookId]);
    }
}
