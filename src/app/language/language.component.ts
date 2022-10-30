import { Component, OnInit } from '@angular/core';
import { Language } from '../models/language.model';
import { LeagueChampionService } from '../services/league-champion.service';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
    languages!: Language[];
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.languages = this.leagueChampionService.getAllLanguages();
    }
}
