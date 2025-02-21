import {Component, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, ViewChild} from '@angular/core';

@Component({
    selector: 'app-headermenu',
    template: '<div #headerMenu></div>',
    styleUrls: ['./headermenu.component.scss']
})
export class HeadermenuComponent implements OnInit {
    @Input() currentRoute;

    @ViewChild('headerMenu', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        if (typeof this.currentRoute.snapshot.children[0] !== 'undefined' &&
            typeof this.currentRoute.snapshot.children[0].data['component'] !== 'undefined') {
            const component = this.currentRoute.snapshot.children[0].data['component'];

            this.viewContainerRef.clear();

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

            this.viewContainerRef.createComponent(componentFactory);
        }
    }
}
