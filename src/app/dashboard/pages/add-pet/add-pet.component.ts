import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../../app.routes';


@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './add-pet.component.html',
  styles: ``
})
export default class AddPetComponent {
 // constructor() {  }
}
