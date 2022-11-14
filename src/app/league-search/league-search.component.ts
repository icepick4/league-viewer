import { Component, OnInit } from '@angular/core';
import { LeagueChampionService } from '../services/league-champion.service';
import { LeagueSearchService } from '../services/league-search.service';

@Component({
    selector: 'app-league-search',
    templateUrl: './league-search.component.html',
    styleUrls: ['./league-search.component.scss'],
})
export class LeagueSearchComponent implements OnInit {
    search!: string;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private searchService: LeagueSearchService
    ) {}
    ngOnInit(): void {
        this.search = this.searchService.getSearch();
        console.log(this.search);
    }

    filterChampions(event: any): void {
        const filter = event.target.value;
        console.log(filter);
        if (filter != null && filter != '') {
            this.searchService.storeSearch(filter);
        }
        this.leagueChampionService.filterChampions(filter);
    }
}
