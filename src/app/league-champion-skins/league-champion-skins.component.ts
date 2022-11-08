import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Champion } from '../models/champion.model';
import { LeagueChampionService } from '../services/league-champion.service';

@Component({
    selector: 'app-league-champion-skins',
    templateUrl: './league-champion-skins.component.html',
    styleUrls: ['./league-champion-skins.component.scss'],
})
export class LeagueChampionSkinsComponent implements OnInit {
    @Input() champion!: Champion | null;
    currentSkin: any;
    imagesLoaded!: number;
    purcentage!: number;
    private swipeCoord!: [number, number];
    private swipeTime!: number;
    constructor(
        private leagueChampionService: LeagueChampionService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((params) => {
            if (params['name']) {
                this.imagesLoaded = 0;
                this.purcentage = 0;
            }
        });
    }

    ngOnInit(): void {
        this.imagesLoaded = 0;
    }

    loading() {
        this.imagesLoaded++;
        this.purcentage = Math.round(
            (this.imagesLoaded * 100) / this.champion!.skins.length / 1
        );
        if (this.champion?.skins.length == this.imagesLoaded) {
            this.champion.loaded = true;
        }
    }

    goRight(): void {
        if (this.champion) {
            this.leagueChampionService.changeSkinRight(this.champion);
        }
    }

    goLeft(): void {
        if (this.champion) {
            this.leagueChampionService.changeSkinLeft(this.champion);
        }
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') {
            this.goRight();
        } else if (event.key === 'ArrowLeft') {
            this.goLeft();
        }
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [
            e.changedTouches[0].clientX,
            e.changedTouches[0].clientY,
        ];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end') {
            const direction = [
                coord[0] - this.swipeCoord[0],
                coord[1] - this.swipeCoord[1],
            ];
            const duration = time - this.swipeTime;

            if (
                duration < 1000 && //
                Math.abs(direction[0]) > 30 && // Long enough
                Math.abs(direction[0]) > Math.abs(direction[1] * 3)
            ) {
                // Horizontal enough
                const swipe = direction[0] < 0 ? 'next' : 'previous';
                if (swipe === 'next') {
                    this.goRight();
                } else {
                    this.goLeft();
                }
            }
        }
    }
}
