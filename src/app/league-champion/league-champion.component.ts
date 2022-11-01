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
    purcentage!: number;
    imagesLoaded: number = 0;
    loaded: boolean = false;
    type!: string | null;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        router.events.subscribe(async () => {
            if (router.url === '/champions') {
                this.champion = null;
            } else {
                const name = this.route.snapshot.params['name'];
                const type = this.route.snapshot.params['type'];
                this.type = type;
                this.purcentage = 0;
                this.loaded = false;
                if (this.type == 'lore') {
                    this.loaded = true;
                }
                this.imagesLoaded = 0;
                this.ngOnInit();
                this.champion =
                    this.leagueChampionService.getChampionByName(name);
                if (this.champion) {
                    this.champion.currentSkin = 0;
                }
            }
        });
    }

    loading() {
        this.imagesLoaded++;
        this.purcentage = Math.round(
            (this.imagesLoaded * 100) / this.champion!.nbSkins / 1
        );
        if (this.champion?.nbSkins == this.imagesLoaded) {
            this.loaded = true;
        }
    }

    close(): void {
        this.router.navigate([`/champions/${this.type}`]);
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
