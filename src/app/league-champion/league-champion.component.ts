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
    imagesLoaded: number = 0;
    loaded: boolean = false;
    constructor(
        private leagueChampionService: LeagueChampionService,
        router: Router,
        private route: ActivatedRoute
    ) {
        router.events.subscribe(async () => {
            if (router.url === '/champions') {
                this.champion = null;
            } else {
                const name = this.route.snapshot.params['name'];
                this.champion =
                    this.leagueChampionService.getChampionByName(name);
            }
        });
    }

    loading() {
        this.imagesLoaded++;
        let numberSkins = 0;
        numberSkins = Math.floor(this.champion!.skins.length / 1);
        if (numberSkins == this.imagesLoaded) {
            this.loaded = true;
        }
    }

    ngOnInit(): void {}

    goRight(): void {
        if (this.champion) {
            this.leagueChampionService.changeSkinRight(this.champion);
        }
    }

    goLeft(): void {
        if (this.champion) {
            this.leagueChampionService.changeSkinLeft(this.champion);
        }
    }
}
