import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
} from '@angular/material';


import {LayoutModule} from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListMenuComponent } from './book-list/book-list-menu.component';
import { HeaderComponent } from './header/header.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { BookService } from './services/book.service';
import { BookFormService } from './services/book-form.service';
import { BookSerieService } from './services/book-serie.service';
import { BookSerieFormService } from './services/book-serie-form.service';

import { GameService } from './services/game.service';
import {GameFormService} from './services/game-form.service';

import { VideoService } from './services/video.service';
import {VideoFormService} from './services/video-form.service';

import { CdService } from './services/cd.service';
import {CdFormService} from './services/cd-form.service';

import { ResponsiveService } from './services/responsive.service';
import { FileService } from './services/file.service';
import {BddService, BookBddService, BookSerieBddService, CdBddService, GameBddService, VideoBddService} from './services/bdd.service';
import { HeadermenuComponent } from './headermenu/headermenu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {BookListComponent, DeleteBookSerieDialogComponent, DeleteErrorBookSerieDialogComponent} from './book/list/book-list.component';
import { BookViewComponent, DeleteBookDialogComponent } from './book/view/book-view.component';
import { BookNewComponent } from './book/new/book-new.component';
import { BookEditComponent } from './book/edit/book-edit.component';
import { BookSerieNewComponent } from './book/serie/new/book-serie-new.component';
import { BookSerieEditComponent } from './book/serie/edit/book-serie-edit.component';

import { VideoListComponent } from './video/list/video-list.component';
import {VideoNewComponent} from './video/new/video-new.component';
import {DeleteVideoDialogComponent, VideoViewComponent} from './video/view/video-view.component';
import {VideoEditComponent} from './video/edit/video-edit.component';

import { GameListComponent } from './game/list/game-list.component';
import {GameNewComponent} from './game/new/game-new.component';
import {DeleteGameDialogComponent, GameViewComponent} from './game/view/game-view.component';
import {GameEditComponent} from './game/edit/game-edit.component';

import { CdListComponent } from './cd/list/cd-list.component';
import {CdNewComponent} from './cd/new/cd-new.component';
import {CdViewComponent, DeleteCdDialogComponent} from './cd/view/cd-view.component';
import {CdEditComponent} from './cd/edit/cd-edit.component';
import {filter} from 'rxjs/operators';
import {Router, Scroll} from '@angular/router';



@NgModule({
    declarations: [
        AppComponent,
        SigninComponent,

        HeaderComponent,
        HeadermenuComponent,

        BookListMenuComponent,

        BookNewComponent,
        BookEditComponent,
        BookViewComponent,
        BookListComponent,
        BookSerieNewComponent,
        BookSerieEditComponent,

        VideoListComponent,
        VideoNewComponent,
        VideoViewComponent,
        VideoEditComponent,

        GameListComponent,
        GameNewComponent,
        GameViewComponent,
        GameEditComponent,

        CdListComponent,
        CdNewComponent,
        CdViewComponent,
        CdEditComponent,

        DeleteBookDialogComponent,
        DeleteBookSerieDialogComponent,
        DeleteErrorBookSerieDialogComponent,
        DeleteVideoDialogComponent,
        DeleteGameDialogComponent,
        DeleteCdDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatDialogModule,
        LayoutModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        AuthGuardService,
        AuthService,
        ResponsiveService,
        FileService,
        BddService,
        { provide: BookBddService, useClass: BddService },
        { provide: BookSerieBddService, useClass: BddService },
        { provide: VideoBddService, useClass: BddService },
        { provide: GameBddService, useClass: BddService },
        { provide: CdBddService, useClass: BddService },
        BookService,
        BookFormService,
        BookSerieService,
        BookSerieFormService,

        GameService,
        GameFormService,

        VideoService,
        VideoFormService,

        CdService,
        CdFormService,
    ],
    entryComponents: [
        BookListMenuComponent,
        DeleteBookDialogComponent,
        DeleteBookSerieDialogComponent,
        DeleteErrorBookSerieDialogComponent,
        DeleteVideoDialogComponent,
        DeleteGameDialogComponent,
        DeleteCdDialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    oldPosition: number;

    constructor(
        router: Router
    ) {
        router.events.pipe(
            filter(event => event instanceof Scroll)
        )
        .subscribe((event) => {
            const contentContainer = document.querySelector('.mat-sidenav-content');

            if ('position' in event && event.position) {
                contentContainer.scrollTop = this.oldPosition;
            } else {
                this.oldPosition = contentContainer.scrollTop;
                contentContainer.scrollTop = 0;
            }
        });
    }
}
