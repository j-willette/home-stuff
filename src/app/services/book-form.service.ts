import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BOOK_GROUPS, BookService} from './book.service';
import {Router} from '@angular/router';
import {BookSerieService} from './book-serie.service';
import {FileService} from './file.service';
import {BookSerie} from '../models/book-serie.model';
import {Subscription} from 'rxjs';
import {Book} from '../models/book.model';

export const BOOK_DEFAULT_TYPE = 'oneshot';

@Injectable({
    providedIn: 'root'
})
export class BookFormService {

    readonly COVER_PATH = 'bookscovers';

    book: Book;
    bookForm: FormGroup;
    series: BookSerie[] = [];
    seriesSubscription: Subscription;

    groups = [];

    constructor(
        private formBuilder: FormBuilder,
        private booksService: BookService,
        private router: Router,
        private serieService: BookSerieService,
        public file: FileService,
    ) {}

    init(book: Book) {
        this.book = book;

        this.bookForm = this.formBuilder.group({
            type: [this.book.type, Validators.required],
            serie: [this.book.serie],
            group: [this.book.group],
            name: [this.book.name, Validators.required],
        });

        this.seriesSubscription = this.serieService.seriesSubject.subscribe(
            (series: BookSerie[]) => {
                this.series = series;
            }
        );
        this.serieService.emit();

        this.groups = BOOK_GROUPS;
    }

    changeSerie(serieId) {
        this.series.forEach((serie: BookSerie) => {
            if (serie.id === serieId) {
                this.bookForm.controls['group'].setValue(serie.group);
                this.bookForm.controls['name'].setValue(serie.name);
                return;
            }
        });
    }

    detectFiles(event) {
        this.file.onUploadFile(event.target.files[0], this.COVER_PATH);
    }

    save(action) {
        this.book.name = this.bookForm.get('name').value;
        this.book.type = this.bookForm.get('type').value;
        this.book.serie = this.bookForm.get('serie').value;
        this.book.group = this.bookForm.get('group').value;

        if (this.file.url && this.file.url !== '') {
            if (this.book.id) {
                this.file.removeFile(this.book.cover_internal_ref);
            }

            this.book.cover = this.file.url;
            this.book.cover_internal_ref = this.file.fileInternalRef;
        }

        if (this.book.id) {
            this.booksService.update(this.book);
        } else {
            this.booksService.create(this.book);

            if (action === 'save') {
                this.router.navigate(['/books']);
            } else {
                this.bookForm.controls['name'].setValue('');
                this.book.id = null;
            }
        }

        this.file.clear();
    }
}
