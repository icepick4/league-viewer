import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cat-easter-egg',
    templateUrl: './cat-easter-egg.component.html',
    styleUrls: ['./cat-easter-egg.component.scss'],
})
export class CatEasterEggComponent implements OnInit {
    catGif!: string;
    constructor() {}

    ngOnInit(): void {
        this.catGif = 'assets/cat.gif';
    }
}
