import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';

@Component({
    selector: 'app-league-icon',
    templateUrl: './league-icon.component.html',
    styleUrls: ['./league-icon.component.scss'],
})
export class LeagueIconComponent implements OnInit {
    @Input() champion!: Champion;
    ngOnInit(): void {}
}
