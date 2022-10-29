import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-champion-list',
    templateUrl: './league-champion-list.component.html',
    styleUrls: ['./league-champion-list.component.scss'],
})
export class LeagueChampionListComponent implements OnInit {
    champions!: Champion[];
    showChampion!: Champion;
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.leagueChampionService
            .getAllChampions()
            .then((champions: Champion[]) => {
                this.champions = champions;
            });
        this.showChampion = new Champion(0, '', '', '', '', [], 0, false);
    }

    onChampionClick(id: number): void {
        this.showChampion = this.champions[id];
        this.showChampion.show = true;
    }
}
