import { Component, OnInit } from '@angular/core';
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
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.selectedRole = this.leagueChampionService.role;
        this.search = this.leagueChampionService.search;
        const input = document.getElementById(
            'input-champ'
        ) as HTMLInputElement;
        input.value = this.search;
    }

    filterChampions(event: any): void {
        console.log('filterChampions');
        this.search = event.target.value;
        const filter = event.target.value;
        //remove all spaces
        const filterNoSpaces = filter.replace(/\s/g, '');
        this.leagueChampionService.setSearch(filterNoSpaces);
    }

    filterChampionsByRole(role: string): void {
        if (role != this.selectedRole) {
            this.selectedRole = role;
            this.leagueChampionService.setRole(this.selectedRole);
        } else {
            this.selectedRole = '';
            this.leagueChampionService.resetRole();
        }
    }
}
