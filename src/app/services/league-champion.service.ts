import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Champion } from '../models/champion.model';
import { HashTable } from '../models/hashTable.model';
import { Language } from '../models/language.model';
@Injectable({
    providedIn: 'root',
})
export class LeagueChampionService {
    champions!: HashTable<Champion[]>;
    languages: Language[];
    language: Language = { name: 'English', code: 'en_US', charged: true };
    purcentage: number = 0;
    version!: string;
    constructor(private router: Router) {
        this.languages = [];
        this.champions = {};
        //wait for getVerison to finish
        this.getVersion().then(() => {
            this.fetchAllLanguages();
            this.fetchAllChampions(this.language.code);
        });
    }

    async getVersion(): Promise<void> {
        const version_res = await fetch(
            'http://ddragon.leagueoflegends.com/api/versions.json'
        );
        const version = (await version_res.json())[0];
        this.version = version;
    }

    async fetchAllChampions(language: string): Promise<void> {
        console.log('fetchAllChampions');
        let temp_champions: Champion[] = [];
        const global_res = await fetch(
            `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${language}/champion.json`
        );
        const data = await global_res.json();
        const fetched_champions = data.data;
        let i = 0;
        for (const champion in fetched_champions) {
            console.log(i);
            this.purcentage = Math.round(
                (i / Object.keys(fetched_champions).length) * 100
            );
            const champ_res = await fetch(
                `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${language}/champion/${fetched_champions[champion].id}.json`
            );
            const champ_data = await champ_res.json();
            const champ = champ_data.data[fetched_champions[champion].id];
            let skinChampId = champ.id;
            champ.skins[0].name = champ.name;
            if (champ.id == 'Fiddlesticks') {
                skinChampId = 'FiddleSticks';
            }
            const skins = champ.skins.map((skin: any) => {
                return {
                    num: skin.num,
                    name: skin.name,
                    splashPath:
                        'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                        skinChampId +
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
                `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/` +
                champ.id +
                '.png';
            let championObj: Champion = new Champion(
                i,
                champ.name,
                champ.lore,
                mainImage,
                icon,
                skins,
                0,
                false
            );
            temp_champions.push(championObj);
            i++;
        }
        this.router.navigateByUrl('/');
        this.language.charged = true;
        this.champions[language] = temp_champions;
    }

    async fetchAllLanguages(): Promise<void> {
        const global_res = await fetch(
            'http://ddragon.leagueoflegends.com/cdn/languages.json'
        );
        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const data = await global_res.json();
        for (const language of data) {
            const regionCode = language.slice(-2);
            const name = regionNames.of(regionCode);
            const code = language;
            if (name != undefined) {
                const languageObject: Language = {
                    name: name,
                    code: code,
                    charged: false,
                };
                if (languageObject.code != 'id_ID') {
                    this.languages.push(languageObject);
                    console.log(languageObject.code);
                }
            }
        }
    }

    getAllLanguages(): Language[] {
        return this.languages;
    }

    changeLanguage(language: string): void {
        console.log(language);
        this.language = this.languages.find(
            (lang) => lang.code == language
        ) as Language;
        if (this.champions[language] == undefined) {
            this.fetchAllChampions(this.language.code);
        } else {
            this.language.charged = true;
        }
    }

    changeSkinRight(champion: Champion): void {
        if (champion.currentSkin < champion.skins.length - 1) {
            champion.currentSkin++;
        } else {
            champion.currentSkin = 0;
        }
    }

    changeSkinLeft(champion: Champion): void {
        if (champion.currentSkin > 0) {
            champion.currentSkin--;
        } else {
            champion.currentSkin = champion.skins.length - 1;
        }
    }

    getChampionByName(name: string): Champion | null {
        for (let champion in this.champions[this.language.code]) {
            if (this.champions[this.language.code][champion].name == name) {
                return this.champions[this.language.code][champion];
            }
        }
        return null;
    }

    getAllChampions(): Champion[] {
        return this.champions[this.language.code];
    }
}
