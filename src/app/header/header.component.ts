import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    displaySubmenu: boolean = false;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.router.events.subscribe(async () => {
            if (router.url.includes('champions')) {
                this.displaySubmenu = true;
            } else {
                this.displaySubmenu = false;
            }
        });
    }

    ngOnInit(): void {}

    navigateToLore(): void {
        const lang = this.activatedRoute.snapshot.params['lang'];
        const name = this.activatedRoute.snapshot.params['name'];
        this.router.navigateByUrl(`/${lang}/champions/lore`);
    }

    navigateToSkins(): void {
        const lang = this.activatedRoute.snapshot.params['lang'];
        this.router.navigateByUrl(`/${lang}/champions/skins`);
    }

    navigateToAll(): void {
        const lang = this.activatedRoute.snapshot.params['lang'];
        this.router.navigateByUrl(`/${lang}/champions/all`);
    }

    navigateToChampions(): void {
        const lang = this.activatedRoute.snapshot.params['lang'];
        this.router.navigateByUrl(`/${lang}/champions`);
    }

    navigateToHome(): void {
        const lang = this.activatedRoute.snapshot.params['lang'];
        this.router.navigateByUrl(`/${lang}`);
    }
}
