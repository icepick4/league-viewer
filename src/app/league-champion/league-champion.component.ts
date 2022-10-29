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

    constructor(
        private leagueChampionService: LeagueChampionService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        router.events.subscribe(() => {
            if (router.url === '/champions') {
                this.champion = null;
            } else {
                const name = this.route.snapshot.params['name'];
                this.champion =
                    this.leagueChampionService.getChampionByName(name);
            }
        });
    }

    ngOnInit(): void {}

    onClose(): void {
        this.router.navigateByUrl('/champions');
    }

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
