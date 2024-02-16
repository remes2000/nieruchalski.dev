import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <a [routerLink]="['/']">Michał Nieruchalski {{ year }}</a>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year = (new Date()).getFullYear();
}
