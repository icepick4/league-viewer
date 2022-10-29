import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeagueChampionListComponent } from './league-champion-list/league-champion-list.component';
import { LeagueChampionComponent } from './league-champion/league-champion.component';
import { LeagueIconComponent } from './league-icon/league-icon.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
    declarations: [
        AppComponent,
        LeagueChampionComponent,
        LeagueIconComponent,
        LeagueChampionListComponent,
        HeaderComponent,
        LandingPageComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
