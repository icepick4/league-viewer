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
    role: string = '';
    search: string = '';
    constructor(private router: Router) {
        this.languages = [];
        this.champions = {};
        //wait for getVerison to finish
        this.getVersion().then(() => {
            this.fetchAllLanguages().then(() => {
                this.languages[0].charged = true;
                this.fetchAllChampions(this.language.code);
            });
        });
    }

    async getVersion(): Promise<void> {
        //get the current version of the game
        const versionResponse = await fetch(
            'http://ddragon.leagueoflegends.com/api/versions.json'
        );
        const version = (await versionResponse.json())[0];
        this.version = version;
    }

    async fetchAllChampions(language: string): Promise<void> {
        console.log('fetchAllChampions');
        let temp_champions: Champion[] = [];
        let i = 0;
        //get all champions for the given language
        const fetched_champions = await this.getAllChamps(language);
        for (const champion in fetched_champions) {
            const champId = fetched_champions[champion].id;
            //get champion data for the given champion id and language
            const champResponse = await fetch(
                `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language.code}/champion/${champId}.json`
            );
            if (!champResponse.ok) {
                throw 'Error :' + champResponse.status;
            }
            const champData = await champResponse.json();
            const champ = champData.data[champId];
            let skinChampId = champ.id;
            //set the name of the champion for the default skin
            champ.skins[0].name = champ.name;
            //fix exception on Fiddlesticks
            if (champ.id == 'Fiddlesticks') {
                skinChampId = 'FiddleSticks';
            }
            const roles = champ.tags;
            const mainImage =
                'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
                champ.id +
                '_0.jpg';
            const icon =
                `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/` +
                champ.id +
                '.png';
            //create a champion object with all the data
            let championObj: Champion = new Champion(
                i,
                champ.name,
                champ.lore,
                mainImage,
                icon,
                this.getSkins(champ.skins, skinChampId),
                0,
                false,
                true,
                roles
            );
            temp_champions.push(championObj);
            i++;
        }
        //when all champions are fetched, go to the home page
        this.router.navigateByUrl('/');
        this.language.charged = true;
        this.champions[language.slice(0, 2)] = temp_champions;
    }

    async fetchAllLanguages(): Promise<void> {
        const global_res = await fetch(
            'http://ddragon.leagueoflegends.com/cdn/languages.json'
        );
        if (!global_res.ok) {
            throw 'Error :' + global_res.status;
        }
        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const data = await global_res.json();
        for (const language of data) {
            const regionCode = language.slice(-2);
            //get the name of the region from the region code
            const name = regionNames.of(regionCode);
            const code = language;
            if (name != undefined) {
                const languageObject: Language = {
                    name: name,
                    code: code,
                    charged: false,
                    sliced_code: code.slice(0, 2),
                };
                //fix exception on Indonesian
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
        //if the language is not charged, fetch all champions for the given language
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

    filterChampions(): void {
        if (this.champions == undefined) {
            return;
        }
        for (let champion in this.champions[this.language.sliced_code]) {
            //if champion name contains the filter string
            if (
                this.champions[this.language.sliced_code][champion].name
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
            ) {
                //if the champion has the role selected or if no role is selected
                if (
                    (this.role != '' &&
                        this.champions[this.language.sliced_code][
                            champion
                        ].roles.includes(this.role)) ||
                    this.role == ''
                ) {
                    this.champions[this.language.sliced_code][champion].show =
                        true;
                } else {
                    this.champions[this.language.sliced_code][champion].show =
                        false;
                }
            } else {
                this.champions[this.language.sliced_code][champion].show =
                    false;
            }
        }
    }

    setRole(role: string): void {
        this.role = role;
        this.filterChampions();
    }

    setSearch(search: string): void {
        this.search = search;
        this.filterChampions();
    }

    resetRole(): void {
        this.role = '';
        this.filterChampions();
    }

    resetSearch(): void {
        this.search = '';
        this.filterChampions();
    }

    searchIsEmpty(): boolean {
        return this.search == '' && this.role == '';
    }
}
