import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from '../models/champion.model';
import { languagesNames } from '../models/language.model';

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
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.champions = this.leagueChampionService.getAllChampionsShown();
    }

    onChampionClick(name: string): void {
        //get the param type in url
        const type = this.activatedRoute.snapshot.params['type'];
        this.router.navigate([`/champions/${type}/${name}`]);
    }

    getLanguageName() {
        return languagesNames[this.leagueChampionService.language.code];
    }
}
