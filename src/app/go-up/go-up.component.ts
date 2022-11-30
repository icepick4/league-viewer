import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-go-up',
    templateUrl: './go-up.component.html',
    styleUrls: ['./go-up.component.scss'],
})
export class GoUpComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    onActivate(event: any) {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 3);
    }

    @HostListener('window:scroll', ['$event'])
    ngAfterContentChecked() {
        let scroll =
            (window.scrollY /
                (document.body.scrollHeight - window.innerHeight)) *
            100;
        scroll = Math.round(scroll);
        if (scroll >= 10) {
            const goUp = document.getElementById('go-up')!;
            goUp.style.visibility = 'visible';
            goUp.style.opacity = '1';
        }
    }
}
