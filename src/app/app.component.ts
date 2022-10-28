import { Component, OnInit } from '@angular/core';
import { Champion } from './models/champion.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    champion!: Champion;
    ngOnInit(): void {
        this.champion = new Champion(
            1,
            'Gangplank',
            'Le lore de Gangplank',
            'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg',
            [
                {
                    id: 0,
                    name: 'Classic',
                    splashPath:
                        'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg',

                    chromas: false,
                },
            ],
            1
        );
    }
}
