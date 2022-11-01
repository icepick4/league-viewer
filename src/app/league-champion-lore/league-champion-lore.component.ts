import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-league-champion-lore',
    templateUrl: './league-champion-lore.component.html',
    styleUrls: ['./league-champion-lore.component.scss'],
})
export class LeagueChampionLoreComponent implements OnInit {
    @Input() lore!: string;
    constructor() {}

    ngOnInit(): void {}
}
