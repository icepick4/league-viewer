import { Component, Input, OnInit } from '@angular/core';
import { Champion } from '../models/champion.model';

@Component({
    selector: 'app-swiping-anim',
    templateUrl: './swiping-anim.component.html',
    styleUrls: ['./swiping-anim.component.scss'],
})
export class SwipingAnimComponent implements OnInit {
    @Input() champion!: Champion;
    constructor() {}

    ngOnInit(): void {}
}
