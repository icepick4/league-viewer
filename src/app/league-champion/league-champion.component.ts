import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';
@Component({
    selector: 'app-league-champion',
    templateUrl: './league-champion.component.html',
    styleUrls: ['./league-champion.component.scss'],
})
export class LeagueChampionComponent implements OnInit {
    @Input() champion!: Champion;
    showLore: boolean = false;
    showSkins: boolean = false;

    ngOnInit(): void {}

    onLoreClick(): void {
        this.showLore = !this.showLore;
    }
    onSkinClick(): void {
        this.showSkins = !this.showSkins;
    }

    onClose(): void {
        this.champion.show = false;
    }
}
