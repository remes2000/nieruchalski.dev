import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModeSwitchComponent } from './_feature/mode-switch/mode-switch.component';
import { WEBSITE_DOMAIN } from '../../const';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, ModeSwitchComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  WEBSITE_DOMAIN = WEBSITE_DOMAIN;
}
