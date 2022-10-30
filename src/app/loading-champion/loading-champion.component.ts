import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-champion',
    templateUrl: './loading-champion.component.html',
    styleUrls: ['./loading-champion.component.scss'],
})
export class LoadingChampionComponent implements OnInit {
    @Input() imagesLoaded: number = 0;
    @Input() totalImages: number = 0;
    constructor() {}

    ngOnInit(): void {}
}
