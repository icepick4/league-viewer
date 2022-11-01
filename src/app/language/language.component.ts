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
    selectedLanguage!: string;
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {
        this.languages = this.leagueChampionService.getAllLanguages();
    }

    changeLanguage(event: any): void {
        let lang = event.target.value;
        let language: Language = this.languages[0];
        for (let i = 0; i < this.languages.length; i++) {
            if (this.languages[i].name === lang) {
                language = this.languages[i];
            }
        }
        this.leagueChampionService.changeLanguage(language);
        this.selectedLanguage = language.name;
    }
}
