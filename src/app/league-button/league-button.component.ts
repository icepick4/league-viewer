import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-league-button',
    templateUrl: './league-button.component.html',
    styleUrls: ['./league-button.component.scss'],
})
export class LeagueButtonComponent implements OnInit {
    @Input() text!: string;
    @Input() color!: string;
    constructor() {}

    ngOnInit(): void {}
}
