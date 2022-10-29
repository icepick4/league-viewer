import { Injectable } from '@angular/core';
import { Champion } from '../models/champion.model';
@Injectable({
    providedIn: 'root',
})
export class LeagueChampionService {
    champions: Champion[];
    constructor() {
        this.champions = [];
    }

    async getAllChampions(): Promise<Champion[]> {
        const global_res = await fetch(
            'http://ddragon.leagueoflegends.com/cdn/12.20.1/data/fr_FR/champion.json'
        );
        const data = await global_res.json();
        const fetched_champions = data.data;
        let i = 0;
        for (const champion in fetched_champions) {
            const champ_res = await fetch(
                `http://ddragon.leagueoflegends.com/cdn/12.20.1/data/fr_FR/champion/${fetched_champions[champion].id}.json`
            );
            const champ_data = await champ_res.json();
            const champ = champ_data.data[fetched_champions[champion].id];
            champ.skins[0].name = champ.name;
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
            const mainImage =
                'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                champ.id +
                '_0.jpg';
            const icon =
                'http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/' +
                champ.id +
                '.png';
            let championObj: Champion = new Champion(
                i,
                champ.name,
                champ.lore,
                mainImage,
                icon,
                skins,
                champ.skins.length - 1,
                0,
                false
            );
            this.champions.push(championObj);
            i++;
        }
        return this.champions;
    }

    changeSkinRight(champion: Champion): void {
        if (champion.currentSkin < champion.nbSkins) {
            champion.currentSkin++;
        } else {
            champion.currentSkin = 0;
        }
    }

    changeSkinLeft(champion: Champion): void {
        if (champion.currentSkin > 0) {
            champion.currentSkin--;
        } else {
            champion.currentSkin = champion.nbSkins;
        }
    }
}
