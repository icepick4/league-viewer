import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.languages = this.leagueChampionService.getAllLanguages();
    }

    changeLanguage(event: any): void {
        this.router.navigate(['/champions']);
        let lang = event.target.value;
        this.leagueChampionService.language.charged = false;
        this.leagueChampionService.changeLanguage(lang);
        this.selectLanguage = this.leagueChampionService.language;
    }

    getLanguageName(code: string): string {
        return languagesNames[code];
    }
}
