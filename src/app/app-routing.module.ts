import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuardService} from './services/auth-guard.service';

import {BookListComponent} from './book/list/book-list.component';
import {BookListMenuComponent} from './book-list/book-list-menu.component';
import {BookViewComponent} from './book/view/book-view.component';
import {BookEditComponent} from './book/edit/book-edit.component';
import {BookNewComponent} from './book/new/book-new.component';
import {BookSerieNewComponent} from './book/serie/new/book-serie-new.component';
import {BookSerieEditComponent} from './book/serie/edit/book-serie-edit.component';

import {VideoListComponent} from './video/list/video-list.component';
import {VideoNewComponent} from './video/new/video-new.component';
import {VideoViewComponent} from './video/view/video-view.component';
import {VideoEditComponent} from './video/edit/video-edit.component';

import {GameListComponent} from './game/list/game-list.component';
import {GameNewComponent} from './game/new/game-new.component';
import {GameViewComponent} from './game/view/game-view.component';
import {GameEditComponent} from './game/edit/game-edit.component';

import {CdListComponent} from './cd/list/cd-list.component';
import {CdNewComponent} from './cd/new/cd-new.component';
import {CdViewComponent} from './cd/view/cd-view.component';
import {CdEditComponent} from './cd/edit/cd-edit.component';


const routes: Routes = [
    { path: 'auth/signin', component: SigninComponent },

    { path: 'books', canActivate: [AuthGuardService], component: BookListComponent, data: {
      component: BookListMenuComponent,
        template: '/book-list/book-list-menu.component.html'
    } },
    { path: 'books/new', canActivate: [AuthGuardService], component: BookNewComponent },
    { path: 'books/:group', canActivate: [AuthGuardService], component: BookListComponent },
    { path: 'books/view/:id', canActivate: [AuthGuardService], component: BookViewComponent },
    { path: 'books/edit/:id', canActivate: [AuthGuardService], component: BookEditComponent },
    { path: 'books/series/new', canActivate: [AuthGuardService], component: BookSerieNewComponent },
    { path: 'books/series/edit/:id', canActivate: [AuthGuardService], component: BookSerieEditComponent },
    { path: 'books/series/:serie', canActivate: [AuthGuardService], component: BookListComponent },

    { path: 'videos', canActivate: [AuthGuardService], component: VideoListComponent },
    { path: 'videos/new', canActivate: [AuthGuardService], component: VideoNewComponent },
    { path: 'videos/:group', canActivate: [AuthGuardService], component: VideoListComponent },
    { path: 'videos/view/:id', canActivate: [AuthGuardService], component: VideoViewComponent },
    { path: 'videos/edit/:id', canActivate: [AuthGuardService], component: VideoEditComponent },

    { path: 'games', canActivate: [AuthGuardService], component: GameListComponent },
    { path: 'games/new', canActivate: [AuthGuardService], component: GameNewComponent },
    { path: 'games/:console', canActivate: [AuthGuardService], component: GameListComponent },
    { path: 'games/view/:id', canActivate: [AuthGuardService], component: GameViewComponent },
    { path: 'games/edit/:id', canActivate: [AuthGuardService], component: GameEditComponent },

    { path: 'cds', canActivate: [AuthGuardService], component: CdListComponent },
    { path: 'cds/new', canActivate: [AuthGuardService], component: CdNewComponent },
    { path: 'cds/view/:id', canActivate: [AuthGuardService], component: CdViewComponent },
    { path: 'cds/edit/:id', canActivate: [AuthGuardService], component: CdEditComponent },

    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: '**', redirectTo: 'books' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
