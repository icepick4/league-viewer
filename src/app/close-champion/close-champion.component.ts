import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-close-champion',
    templateUrl: './close-champion.component.html',
    styleUrls: ['./close-champion.component.scss'],
})
export class CloseChampionComponent implements OnInit {
    type: string = this.router.url.split('/')[3];
    lang: string = this.router.url.split('/')[2];
    constructor(private router: Router) {}

    ngOnInit(): void {}

    close(): void {
        this.router.navigate([`/${this.lang}/champions/${this.type}`]);
    }
}
