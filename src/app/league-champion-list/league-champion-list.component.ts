import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-champion-list',
    templateUrl: './league-champion-list.component.html',
    styleUrls: ['./league-champion-list.component.scss'],
})
export class LeagueChampionListComponent implements OnInit {
    champions!: Champion[];
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.champions = this.leagueChampionService.getAllChampions();
    }

    onChampionClick(name: string): void {
        //get the type in url
        const type = this.router.url.split('/')[2];
        this.router.navigate([`/champions/${type}/${name}`]);
    }
}
