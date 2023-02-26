import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LeagueChampionListComponent } from './league-champion-list/league-champion-list.component';
import { LeagueChampionComponent } from './league-champion/league-champion.component';

const routes: Routes = [
      {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'champions',
        component: LeagueChampionListComponent,
      },
      {
        path: 'champions/:type',
        component: LeagueChampionListComponent,
      },
      {
        path: 'champions/:type/:name',
        component: LeagueChampionComponent,
      },
      {
        path: '**',
        component: LeagueChampionListComponent,
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}
