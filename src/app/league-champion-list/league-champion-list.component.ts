import { Component, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';

@Component({
    selector: 'app-league-champion-list',
    templateUrl: './league-champion-list.component.html',
    styleUrls: ['./league-champion-list.component.scss'],
})
export class LeagueChampionListComponent implements OnInit {
    champions!: Champion[];
    constructor() {}

    ngOnInit(): void {
        this.champions = [];
        this.fillChampions();
    }

    async fillChampions(): Promise<Promise<void>> {
        const global_res = await fetch(
            'http://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/champion.json'
        );
        const data = await global_res.json();
        const fetched_champions = data.data;
        let i = 0;
        for (const champion in fetched_champions) {
            const champ_res = await fetch(
                `http://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/champion/${fetched_champions[champion].id}.json`
            );
            const champ_data = await champ_res.json();
            const champ = champ_data.data[fetched_champions[champion].id];
            champ.skins[0].name = champ.name + ' (Skin par défaut)';
            const skins = champ.skins.map((skin: any) => {
                return {
                    num: skin.num,
                    name: skin.name,
                    splashPath:
                        'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                        champ.id +
                        '_' +
                        skin.num +
                        '.jpg',
                    chromas: skin.chromas,
                };
            });
            let championObj: Champion = new Champion(
                i,
                champ.name,
                champ.lore,
                'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' +
                    champ.id +
                    '_0.jpg',
                'http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/' +
                    champ.id +
                    '.png',
                skins,
                champ.skins.length - 1
            );
            this.champions.push(championObj);
            i++;
        }
    }

    onChampionClick(id: number): void {
        console.log(id);
    }
}