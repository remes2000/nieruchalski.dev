import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
    selector: 'app-blog',
    imports: [RouterOutlet, NavComponent, FooterComponent],
    template: `
    <app-nav />
    <router-outlet></router-outlet>
    <app-footer />
  `
})
export default class BlogPage {
}
