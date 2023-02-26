import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion, roles } from '../models/champion.model';
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
    ) {
        //subscribe to the param role in url
        this.activatedRoute.params.subscribe((params) => {
            const role = params['filter'];
            console.log(role);
            if (roles.includes(role)) {
                this.leagueChampionService.filterChampionsByRole(role);
            }
        });
    }

    ngOnInit(): void {
        this.champions = this.leagueChampionService.getAllChampions();
    }

    onChampionClick(name: string): void {
        //get the param type in url
        const type = this.activatedRoute.snapshot.params['type'];
        this.router.navigate([`/champions/${type}/${name}`]);
    }

    getLanguageName() {
        return languagesNames[this.leagueChampionService.language.code];
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any) {}
}
