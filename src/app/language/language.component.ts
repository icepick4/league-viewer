import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    constructor(
        private leagueChampionService: LeagueChampionService,
        private route: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.languages = this.leagueChampionService.getAllLanguages();
    }

    changeLanguage(event: any): void {
        this.selectedLanguage = event.target.value;
        let language: Language = this.languages[0];
        for (let i = 0; i < this.languages.length; i++) {
            if (this.languages[i].name === this.selectedLanguage) {
                language = this.languages[i];
            }
        }
        this.leagueChampionService.changeLanguage(language);
        //remove language from url
        const url = this.route.url.split('/');
        url.splice(1, 1);
        const newUrl = url.join('/');
        this.route.navigateByUrl(`/${language.code}${newUrl}`);
    }
}
