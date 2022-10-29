import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeagueChampionComponent } from './league-champion/league-champion.component';
import { LeagueIconComponent } from './league-icon/league-icon.component';
import { LeagueChampionListComponent } from './league-champion-list/league-champion-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [AppComponent, LeagueChampionComponent, LeagueIconComponent, LeagueChampionListComponent, HeaderComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
