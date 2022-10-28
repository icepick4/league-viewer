import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-league-champion',
    templateUrl: './league-champion.component.html',
    styleUrls: ['./league-champion.component.scss'],
})
export class LeagueChampionComponent implements OnInit {
    name!: string;
    description!: string;
    icon!: string;
    mainImage!: string;
    skins!: { [key: number]: string };
    nbSkins!: number;

    ngOnInit(): void {
        this.name = 'Gangplank';
        this.description = 'Le lore de Gangplank';
        this.icon =
            'https://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/Gangplank.png';
        this.mainImage =
            'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg';
        this.skins = {
            0: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg',
            1: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_1.jpg',
            2: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_2.jpg',
            3: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_3.jpg',
            4: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_4.jpg',
            5: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_5.jpg',
            6: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_6.jpg',
            7: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_7.jpg',
            8: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_8.jpg',
            9: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_9.jpg',
            10: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_10.jpg',
            11: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_11.jpg',
        };
        this.nbSkins = Object.keys(this.skins).length;
    }
}
