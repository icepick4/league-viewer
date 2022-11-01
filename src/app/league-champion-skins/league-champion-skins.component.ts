import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';

@Component({
    selector: 'app-league-champion-skins',
    templateUrl: './league-champion-skins.component.html',
    styleUrls: ['./league-champion-skins.component.scss'],
})
export class LeagueChampionSkinsComponent implements OnInit {
    @Input() champion!: Champion;
    currentSkin: any;
    loaded!: boolean;
    imagesLoaded: number = 0;
    purcentage!: number;
    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {}

    loading() {
        this.imagesLoaded++;
        this.purcentage = Math.round(
            (this.imagesLoaded * 100) / this.champion!.nbSkins / 1
        );
        if (this.champion?.nbSkins == this.imagesLoaded) {
            this.loaded = true;
        }
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
