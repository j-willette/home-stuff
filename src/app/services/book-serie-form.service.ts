import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BOOK_GROUPS} from './book.service';
import {Router} from '@angular/router';
import {BookSerieService} from './book-serie.service';
import {FileService} from './file.service';
import {BookSerie} from '../models/book-serie.model';

@Injectable({
    providedIn: 'root'
})
export class BookSerieFormService {

    readonly COVER_PATH = 'booksseriescovers';

    serie: BookSerie;
    serieForm: FormGroup;

    groups = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private serieService: BookSerieService,
        public file: FileService,
    ) {}

    init(serie: BookSerie) {
        this.serie = serie;

        this.serieForm = this.formBuilder.group({
            name: [this.serie.name, Validators.required],
            group: [this.serie.group, Validators.required],
        });

        this.groups = BOOK_GROUPS;
    }

    detectFiles(event) {
        this.file.onUploadFile(event.target.files[0], this.COVER_PATH);
    }

    save() {
        this.serie.name = this.serieForm.get('name').value;
        this.serie.group = this.serieForm.get('group').value;

        if (this.file.url && this.file.url !== '') {
            if (this.serie.id && this.serie.cover_internal_ref) {
                this.file.removeFile(this.serie.cover_internal_ref);
            }

            this.serie.cover = this.file.url;
            this.serie.cover_internal_ref = this.file.fileInternalRef;
        }

        if (this.serie.id) {
            this.serieService.update(this.serie);
        } else {
            this.serieService.create(this.serie);
        }

        this.file.clear();

        this.router.navigate(['/books/series/' + this.serie.id]);
    }
}
