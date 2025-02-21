import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

import {BookService, BOOK_GROUPS} from '../../services/book.service';
import {BookSerieService} from '../../services/book-serie.service';
import {Book} from '../../models/book.model';
import {BookSerie} from '../../models/book-serie.model';
import {ResponsiveService} from '../../services/responsive.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface DialogDeleteBookSerieData {
    serie: BookSerie;
}

@Component({
    selector: 'app-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {

    books: Book[] = [];
    booksDisplay = {};
    booksSubscription: Subscription;
    series: BookSerie[] = [];
    seriesSubscription: Subscription;

    groups = [];
    currentGroup = '';

    groupBySerie = true;

    serieView = '';
    serieCurrent: BookSerie;

    constructor(
        private bookService: BookService,
        private serieService: BookSerieService,
        private router: Router,
        private route: ActivatedRoute,
        public responsive: ResponsiveService,
        public dialog: MatDialog,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    ngOnInit() {
        this.booksSubscription = this.bookService.booksSubject.subscribe(
            (books: Book[]) => {
                this.books = books;

                if ('serie' in this.route.snapshot.params) {
                    this.serieView = this.route.snapshot.params['serie'];

                    const tmpBooks = [];

                    this.books.forEach((book) => {
                        if (book.serie === this.serieView) {
                            tmpBooks.push(book);
                        }
                    });

                    this.books = tmpBooks;
                }

                if ('group' in this.route.snapshot.params) {
                    this.currentGroup = this.route.snapshot.params['group'];

                    const tmpBooks = [];

                    this.books.forEach((book) => {
                        if ((book.group.toLowerCase() === this.currentGroup)) {
                            tmpBooks.push(book);
                        }
                    });

                    this.books = tmpBooks;
                }

                this.setDisplayedBooks(this.books, 'book');
            }
        );
        this.bookService.emit();

        this.seriesSubscription = this.serieService.seriesSubject.subscribe(
            (series: BookSerie[]) => {
                const tmpSeries = [];

                series.forEach((serie) => {
                    if (serie.group.toLowerCase() === this.currentGroup || this.currentGroup === '') {
                        tmpSeries.push(serie);
                    }

                    if (serie.id === this.route.snapshot.params['serie']) {
                        this.serieCurrent = serie;
                    }
                });

                this.series = tmpSeries;

                this.setDisplayedBooks(this.series, 'serie');
            }
        );
        this.serieService.emit();

        this.groups = BOOK_GROUPS;
    }

    setDisplayedBooks(arrayType, type) {
        const tmpBooksDisplay = this.booksDisplay;

        arrayType.forEach((obj) => {
            if (type === 'book' && obj.type === 'oneshot' ||
                type === 'book' && 'serie' in this.route.snapshot.params ||
                type === 'serie' && 'serie' in this.route.snapshot.params === false
            ) {
                tmpBooksDisplay[obj.name.toString()] = obj;
            }
        });

        Object.keys(tmpBooksDisplay).sort().forEach((key) => {
            this.booksDisplay[key] = tmpBooksDisplay[key];
        });
    }

    ngOnDestroy() {
        this.booksSubscription.unsubscribe();
        this.seriesSubscription.unsubscribe();
    }

    deleteSerie() {
        if (this.books.length > 0) {
            this.dialog.open(DeleteErrorBookSerieDialogComponent, {
                width: '350px',
            });

            return;
        }

        const dialogRef = this.dialog.open(DeleteBookSerieDialogComponent, {
            width: '350px',
            data: {serie: this.serieCurrent}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.serieService.remove(this.serieCurrent);
                this.router.navigate(['/books']);
            }
        });
    }

    getCurrentGroup() {
        let currentGroup = '';

        if ('group' in this.route.snapshot.params) {
            this.groups.forEach((group) => {
                if ((group.toLowerCase() === this.currentGroup)) {
                    currentGroup = group;
                    return;
                }
            });
        }

        return currentGroup;
    }

    back() {
        this.router.navigate(['/books']);
    }
}

@Component({
    selector: 'app-delete-book-serie-dialog',
    template: `
        <h1 mat-dialog-title>Suppression d'une série de livres</h1>
        <p>Voulez-vous vraiment supprimer la série <strong>{{ data.serie.name }}</strong> ?</p>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()">J'ai changé d'avis</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="data.serie.id" cdkFocusInitial>Supprimer</button>
        </div>
    `,
})
export class DeleteBookSerieDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteBookSerieDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDeleteBookSerieData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'app-delete-error-book-serie-dialog',
    template: `
        <p>Impossible de supprimer la série tant qu'il y a des éléments dedans</p>
        <div mat-dialog-actions>
            <button mat-raised-button color="accent" (click)="onClick()" cdkFocusInitial>J'ai compris</button>
        </div>
    `,
})
export class DeleteErrorBookSerieDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteErrorBookSerieDialogComponent>,
    ) {}

    onClick(): void {
        this.dialogRef.close();
    }
}
