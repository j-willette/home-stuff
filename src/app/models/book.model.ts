import {BOOK_DEFAULT_TYPE} from '../services/book-form.service';

export class Book {
    id: string;
    name: string;
    type = BOOK_DEFAULT_TYPE;
    serie: string;
    group: string;
    cover: string;
    cover_internal_ref: string;

    constructor() {
    }
}
