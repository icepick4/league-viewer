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
    language: Language = {
        name: 'English',
        code: 'en_US',
        charged: true,
        sliced_code: 'en',
    };
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
        let i = 0;
        const fetched_champions = await this.getAllChamps(language);
        for (const champion in fetched_champions) {
            const champId = fetched_champions[champion].id;
            const champ_res = await fetch(
                `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language.code}/champion/${champId}.json`
            );
            if (!champ_res.ok) {
                throw 'Error :' + champ_res.status;
            }
            const champ_data = await champ_res.json();
            const champ = champ_data.data[champId];
            let skinChampId = champ.id;
            champ.skins[0].name = champ.name;
            if (champ.id == 'Fiddlesticks') {
                skinChampId = 'FiddleSticks';
            }
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
                this.getSkins(champ.skins, skinChampId),
                0,
                false,
                true
            );
            temp_champions.push(championObj);
            i++;
        }
        this.router.navigateByUrl('/');
        this.language.charged = true;
        this.champions[language.slice(0, 2)] = temp_champions;
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
                    sliced_code: code.slice(0, 2),
                };
                if (languageObject.code != 'id_ID') {
                    this.languages.push(languageObject);
                }
            }
        }
    }

    getSkins(skins: any[], skinChampId: number): any[] {
        return skins.map((skin) => {
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
    }

    async getAllChamps(language: string): Promise<any[]> {
        const global_res = await fetch(
            `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${language}/champion.json`
        );
        if (!global_res.ok) {
            throw 'Error :' + global_res.status;
        }
        const data = await global_res.json();
        const fetched_champions = data.data;
        return fetched_champions;
    }

    getAllLanguages(): Language[] {
        return this.languages;
    }

    changeLanguage(language: string): void {
        this.language = this.languages.find(
            (lang) => lang.code == language
        ) as Language;
        if (this.champions[language.slice(0, 2)] == undefined) {
            this.fetchAllChampions(this.language.code);
        } else {
            this.language.charged = true;
            this.router.navigateByUrl('/');
        }
    }

    getChampionByName(name: string): Champion | null {
        for (let champion in this.champions[this.language.sliced_code]) {
            if (
                this.champions[this.language.sliced_code][champion].name == name
            ) {
                return this.champions[this.language.sliced_code][champion];
            }
        }
        return null;
    }

    getAllChampions(): Champion[] {
        return this.champions[this.language.sliced_code];
    }

    filterChampions(filter: string): void {
        if (this.champions == undefined) {
            return;
        }
        //if champion name contains filter
        for (let champion in this.champions[this.language.sliced_code]) {
            if (
                this.champions[this.language.sliced_code][champion].name
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            ) {
                this.champions[this.language.sliced_code][champion].show = true;
            } else {
                this.champions[this.language.sliced_code][champion].show =
                    false;
            }
        }
    }

    unfilterChampions(): void {
        for (let champion in this.champions[this.language.sliced_code]) {
            this.champions[this.language.sliced_code][champion].show = true;
        }
    }
}
