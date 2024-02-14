import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>
      <a [routerLink]="['/']">mnieruchalski.me</a>
    </h1>
    <router-outlet></router-outlet>
  `,
})
export default class BlogPage {
  
}
