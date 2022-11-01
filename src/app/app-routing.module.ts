import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LanguageComponent } from './language/language.component';
import { LeagueChampionListComponent } from './league-champion-list/league-champion-list.component';

const routes: Routes = [
    {
        path: 'champions',
        component: LeagueChampionListComponent,
    },
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'champions/:type',
        component: LeagueChampionListComponent,
    },
    {
        path: 'champions/:type/:name',
        component: LeagueChampionListComponent,
    },
    {
        path: 'languages',
        component: LanguageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
