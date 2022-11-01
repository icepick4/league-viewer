import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-champion-list',
    templateUrl: './league-champion-list.component.html',
    styleUrls: ['./league-champion-list.component.scss'],
})
export class LeagueChampionListComponent implements OnInit {
    champions!: Champion[];
    selectedChampion: string | null = null;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        router.events.subscribe(async () => {
            if (
                router.url === '/champions' ||
                router.url === '/champions/all' ||
                router.url === '/champions/lore' ||
                router.url === '/champions/skins'
            ) {
                this.selectedChampion = null;
            } else {
                this.selectedChampion = this.router.url.split('/')[4];
            }
        });
    }

    ngOnInit(): void {
        this.champions = this.leagueChampionService.getAllChampions();
        this.selectedChampion = this.router.url.split('/')[4];
    }

    onChampionClick(name: string): void {
        //get the param type in url
        const type = this.activatedRoute.snapshot.params['type'];
        const lang = this.activatedRoute.snapshot.params['lang'];
        this.router.navigate([`/${lang}/champions/${type}/${name}`]);
    }
}
