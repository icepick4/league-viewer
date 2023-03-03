# [LeagueViewer](https://icepick4.github.io/league-viewer/)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) \
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com) \
[![forthebadge](https://forthebadge.com/images/badges/contains-cat-gifs.svg)](https://forthebadge.com) \
(find the easter egg ! 😁)
## Context

This app was made to learn the framework Angular and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.
You can visualize all champs in League, or make a search by role and/or by name. 
Then you have their skins, lore and names. 

Try it here : [LeagueViewer](https://icepick4.github.io/league-viewer/)

## Datas

I fetch datas thank's to the riot's API, Data Dragon, which is updated with each patch on League.
You can see it in that [file](/src/app/services/league-champion.service.ts)


## Start dev

Run `npm i` in the project to init it and download all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
