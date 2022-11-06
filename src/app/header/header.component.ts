import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    displaySubMenu: boolean = false;
    displayLanguages: boolean = false;
    constructor(private router: Router) {
        this.router.events.subscribe(async () => {
            if (
                router.url.includes('champions') ||
                router.url.includes('lore') ||
                router.url.includes('skins') ||
                router.url.includes('all')
            ) {
                this.displaySubMenu = true;
            } else {
                this.displaySubMenu = false;
            }
        });
    }

    ngOnInit(): void {}
}
