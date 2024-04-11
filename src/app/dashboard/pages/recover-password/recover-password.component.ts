import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './recover-password.component.html',
  styles: ``
})
export default class RecoverPasswordComponent {

}
//URL for recover password on Firebase AUTH
//https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyDSNgDmkvGv6a18hAk0CymT-_EgMORW50A
