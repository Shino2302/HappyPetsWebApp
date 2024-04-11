import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-config-dispenser',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './config-dispenser.component.html',
  styles: ``
})
export default class ConfigDispenserComponent implements OnInit{
  uid:any;
  token:any;

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
  }
}
