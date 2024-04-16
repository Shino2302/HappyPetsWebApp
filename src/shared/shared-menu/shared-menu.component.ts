import { Component } from '@angular/core';
import { routes } from '../../app/app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shared-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shared-menu.component.html',
})
export class SharedMenuComponent {
  public menuItemsIfOnlog = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path === 'login');
  



  public menuAllRoutes = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path !== 'login' && route.path !== 'register');


  constructor() { 
  }
}
