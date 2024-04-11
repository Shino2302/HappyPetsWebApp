import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styles: ``
})
export default class CameraComponent implements OnInit{
  uid:any;
  token:any;

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid')?.toString();
    this.token = this.route.snapshot.paramMap.get('token')?.toString();
  }
}
