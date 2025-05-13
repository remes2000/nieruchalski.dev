import { Component, inject } from '@angular/core';
import { ThemeModeService } from '../../../../services/theme-mode.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-mode-switch',
    imports: [AsyncPipe],
    templateUrl: './mode-switch.component.html',
    styleUrl: './mode-switch.component.scss'
})
export class ModeSwitchComponent {
  themeModeService = inject(ThemeModeService);
  mode$ = this.themeModeService.mode$;
  toggle() {
    this.themeModeService.toggle();
  }
}
