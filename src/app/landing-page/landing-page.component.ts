import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language.model';
import { LeagueChampionService } from '../services/league-champion.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
    languageCharged!: Language;
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.languageCharged = this.leagueChampionService.language;
    }
}
