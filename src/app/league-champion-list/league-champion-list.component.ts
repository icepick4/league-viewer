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
        if (this.leagueChampionService.champions.length === 0) {
            this.leagueChampionService
                .getAllChampions()
                .then((champions: Champion[]) => {
                    this.champions = champions;
                });
        } else {
            this.champions = this.leagueChampionService.champions;
        }
        this.showChampion = new Champion(0, '', '', '', '', [], 0, 0, false);
    }

    onChampionClick(id: number): void {
        //preload the mainImage of the champion
        const img = new Image();
        img.src = this.champions[id].mainImage;

        this.showChampion = this.champions[id];
        this.showChampion.show = true;
    }
}
