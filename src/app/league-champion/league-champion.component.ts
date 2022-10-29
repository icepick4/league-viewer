import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';
@Component({
    selector: 'app-league-champion',
    templateUrl: './league-champion.component.html',
    styleUrls: ['./league-champion.component.scss'],
})
export class LeagueChampionComponent implements OnInit {
    @Input() champion!: Champion;

    constructor(private leagueChampionService: LeagueChampionService) {}

    ngOnInit(): void {}

    onClose(): void {
        this.champion.show = false;
    }

    displayTheChampion(): void {
        this.champion.show = true;
    }

    goRight(): void {
        this.leagueChampionService.changeSkinRight(this.champion);
    }

    goLeft(): void {
        this.leagueChampionService.changeSkinLeft(this.champion);
    }
}
