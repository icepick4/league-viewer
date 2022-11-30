import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-champion',
    templateUrl: './league-champion.component.html',
    styleUrls: ['./league-champion.component.scss'],
})
export class LeagueChampionComponent implements OnInit {
    champion!: Champion | null;
    type!: string | null;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        router.events.subscribe(async () => {
            if (
                router.url === '/champions/names' ||
                router.url === '/champions/all' ||
                router.url === '/champions/lore' ||
                router.url === '/champions/skins'
            ) {
                this.champion = null;
            } else {
                const name = this.route.snapshot.params['name'];
                this.type = this.route.snapshot.params['type'];
                this.champion =
                    this.leagueChampionService.getChampionByName(name);

                if (this.champion) {
                    this.champion.currentSkin = 0;
                    //if the type of display doesnt contain images, the champion is loaded
                    if (this.type != 'skins' && this.type != 'all') {
                        this.champion.loaded = true;
                    }
                }
            }
        });
    }
    ngOnInit(): void {}
}
