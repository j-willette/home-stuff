import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Book} from '../../models/book.model';
import {BookService} from '../../services/book.service';
import {ResponsiveService} from '../../services/responsive.service';

export interface DialogDeleteBookData {
    book: Book;
}

@Component({
  selector: 'app-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {

    book: Book;

    constructor(
        private route: ActivatedRoute,
        private booksService: BookService,
        private router: Router,
        public responsive: ResponsiveService,
        public dialog: MatDialog,
    ) {}

    ngOnInit() {
        this.book = new Book();
        const id = this.route.snapshot.params['id'];

        this.booksService.get(id).then(
            (book: Book) => {
                this.book = book;
            }
        );
    }

    delete() {
        const dialogRef = this.dialog.open(DeleteBookDialogComponent, {
            width: '350px',
            data: {book: this.book}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.booksService.remove(this.book);
                this.router.navigate(['/books']);
            }
        });
    }

    back() {
        if (this.book.serie) {
            this.router.navigate(['/books/series/' + this.book.serie]);
        } else {
            this.router.navigate(['/books']);
        }
    }
}

@Component({
    selector: 'app-delete-book-dialog',
    template: `
        <h1 mat-dialog-title>Suppression d'un livre</h1>
        <p>Voulez-vous vraiment supprimer le livre <strong>{{ data.book.name }}</strong> ?</p>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onNoClick()">J'ai changé d'avis</button>
            <button mat-raised-button color="warn" [mat-dialog-close]="data.book.id" cdkFocusInitial>Supprimer</button>
        </div>
    `,
})
export class DeleteBookDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteBookDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDeleteBookData,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
