import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialMediaComponent } from './social-media/social-media.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, SocialMediaComponent],
  template: `
    <footer>
      <div>
        <a [routerLink]="['/']">Michał Nieruchalski {{ year }}</a>
      </div>
      <app-social-media />
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year = (new Date()).getFullYear();
}
