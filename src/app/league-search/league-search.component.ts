import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueChampionService } from '../services/league-champion.service';

@Component({
    selector: 'app-league-search',
    templateUrl: './league-search.component.html',
    styleUrls: ['./league-search.component.scss'],
})
export class LeagueSearchComponent implements OnInit {
    search!: string;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router
    ) {
        router.events.subscribe(async () => {
            if (router.url === '/') {
                this.leagueChampionService.unfilterChampions();
            }
        });
    }

    ngOnInit(): void {}

    filterChampions(event: any): void {
        const filter = event.target.value;
        //remove all spaces
        const filterNoSpaces = filter.replace(/\s/g, '');
        this.leagueChampionService.filterChampions(filterNoSpaces);
    }
}
