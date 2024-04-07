import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedMenuComponent } from '../../shared/shared-menu/shared-menu.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SharedMenuComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

}
