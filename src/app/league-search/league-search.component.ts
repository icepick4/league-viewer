import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-search',
    templateUrl: './league-search.component.html',
    styleUrls: ['./league-search.component.scss'],
})
export class LeagueSearchComponent implements OnInit {
    search!: string;
    roles = roles;
    selectedRole!: string;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router,
        private route : ActivatedRoute
    ) {
        router.events.subscribe(async () => {
            if (router.url === '/') {
                this.leagueChampionService.unfilterChampions();
            }
            if (
                router.url != '/champions/skins' &&
                router.url != '/champions/names' &&
                router.url != '/champions/lore'
            ) {
                this.leagueChampionService.unfilterChampions();
            }
        });
    }

    ngOnInit(): void {}

    filterChampions(event: any): void {
        this.search = event.target.value;
        const filter = event.target.value;
        //remove all spaces
        const filterNoSpaces = filter.replace(/\s/g, '');
        this.leagueChampionService.filterChampions(filterNoSpaces);
    }

    filterChampionsByRole(role: string): void {
        if (role != this.selectedRole){
            this.selectedRole = role;
            this.leagueChampionService.filterChampionsByRole(this.selectedRole);
        }
        else{
            this.selectedRole = '';
            this.leagueChampionService.unfilterChampions();
        }
    }
}
