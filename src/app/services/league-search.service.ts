import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class LeagueSearchService {
    constructor() {}

    storeSearch(search: string): void {
        localStorage.setItem('search', search);
    }

    getSearch(): string {
        return localStorage.getItem('search') || '';
    }
}
