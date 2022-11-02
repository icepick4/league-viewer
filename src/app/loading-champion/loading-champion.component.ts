import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading-champion',
    templateUrl: './loading-champion.component.html',
    styleUrls: ['./loading-champion.component.scss'],
})
export class LoadingChampionComponent implements OnInit {
    @Input() purcentage: string = '0%';
    constructor() {}
    ngOnInit(): void {}
}
