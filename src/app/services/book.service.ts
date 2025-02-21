import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataSnapshot} from 'firebase/database';

import {Book} from '../models/book.model';
import {BookBddService} from './bdd.service';

export const BOOK_GROUPS = [
    'BD',
    'Romans',
    'Manga',
    'Cuisine',
];

@Injectable()
export class BookService {

    readonly BDD_PATH = '/books';

    books: Book[] = [];
    booksSubject = new Subject<Book[]>();

    groups = [];

    constructor(
        public bddService: BookBddService
    ) {
        bddService.init(this.BDD_PATH, this.books, this.booksSubject);
        this.getAll();
    }

    emit() {
        this.bddService.emit();
    }

    getAll() {
        this.bddService.getAll((data: DataSnapshot) => {
            const book = data.val();

            book.id = data.key;
            this.books.push(book);
            this.emit();

            this.groups.push(book.group);
            this.groups = this.groups.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        });
    }

    get(id: string) {
        return this.bddService.get(id);
    }

    create(newBook: Book) {
        this.bddService.create(newBook);
    }

    update(book: Book) {
        this.bddService.update(book);
    }

    remove(book: Book) {
        this.bddService.remove(book);
    }
}
