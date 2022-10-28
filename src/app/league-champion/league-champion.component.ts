import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';
@Component({
    selector: 'app-league-champion',
    templateUrl: './league-champion.component.html',
    styleUrls: ['./league-champion.component.scss'],
})
export class LeagueChampionComponent implements OnInit {
    @Input() champion!: Champion;
    ngOnInit(): void {}
}
