import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService {
    isLargeScreen: boolean;
    largeScreenValue = '(min-width: 769px)';

    private changeSize = new Subject();

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {
        this.isLargeScreen = breakpointObserver.isMatched(this.largeScreenValue);

        this.onResize(() => {
            this.isLargeScreen = breakpointObserver.isMatched(this.largeScreenValue);
        });

        // @HostListener not possible in service
        window.addEventListener('resize', () => {
            this.changeSize.next();
        });
    }

    onResize(callback) {
        this.changeSize.pipe(
            debounceTime(200)
        ).subscribe(callback);
    }
}
