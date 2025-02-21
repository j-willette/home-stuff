import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './services/auth.service';
import {ResponsiveService} from './services/responsive.service';

import {BreakpointObserver} from '@angular/cdk/layout';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    navModeExpand = true;
    isAuth: boolean;

    sidebar = {
        opened: false,
        mode: 'push',
        items: [
            {
                className: 'book',
                link: '/books',
                icon: 'books',
                text: 'Bibliothèque',
            },
            {
                className: 'video',
                link: '/videos',
                icon: 'local_movies',
                text: 'Vidéothèque',
            },
            {
                className: 'game',
                link: '/games',
                icon: 'videogame_asset',
                text: 'Ludothèque',
            },
            {
                className: 'cd',
                link: '/cds',
                icon: 'album',
                text: 'Cédéthèque',
            },
        ],
    };

    constructor(
        private authService: AuthService,
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private route: ActivatedRoute,
        public responsive: ResponsiveService
    ) {
        const config = {
            apiKey: 'xxx',
            authDomain: 'xxx.firebaseapp.com',
            databaseURL: 'https://xxx.firebaseio.com',
            projectId: 'xxx',
            storageBucket: 'xxx.appspot.com',
            messagingSenderId: 'xxx',
        };
        firebase.initializeApp(config);

        responsive.onResize(() => {
            this.initSidebar();
        });
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.isAuth = !!(user);
            }
        );

        this.initSidebar();
    }

    initSidebar() {
        if (this.responsive.isLargeScreen) {
            this.sidebar.mode = 'side';
            this.sidebar.opened = true;
        } else {
            this.sidebar.mode = 'push';
            this.sidebar.opened = false;
        }
    }

    getPrimaryColorClass() {
        if (this.router.url.startsWith('/books')) {
            return 'book';
        }

        if (this.router.url.startsWith('/videos')) {
            return 'video';
        }

        if (this.router.url.startsWith('/games')) {
            return 'game';
        }

        if (this.router.url.startsWith('/cds')) {
            return 'cd';
        }
    }


    toggleNavMode() {
        this.navModeExpand = !this.navModeExpand;
    }

    toggleSidebar() {
        if (!this.responsive.isLargeScreen) {
            this.sidebar.opened = !this.sidebar.opened;
        }
    }

    onSignOut() {
        this.authService.signOutUser();
    }

    getRoute() {
        return this.route;
    }
}
