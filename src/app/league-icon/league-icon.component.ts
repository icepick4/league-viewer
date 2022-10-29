import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-league-icon',
    templateUrl: './league-icon.component.html',
    styleUrls: ['./league-icon.component.scss'],
})
export class LeagueIconComponent implements OnInit {
    @Input() icon!: string;
    @Input() id!: number;
    ngOnInit(): void {}
}
