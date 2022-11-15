import { Component, OnInit } from '@angular/core';
import { Language, languagesNames } from '../models/language.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
    languages!: Language[];
    selectLanguage: Language = this.leagueChampionService.language;
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.languages = this.leagueChampionService.getAllLanguages();
    }

    changeLanguage(event: any): void {
        let lang = event.target.value;
        this.leagueChampionService.language.charged = false;
        this.leagueChampionService.changeLanguage(lang);
        this.selectLanguage = this.leagueChampionService.language;
    }

    getLanguageName(code: string): string {
        return languagesNames[code];
    }
}
