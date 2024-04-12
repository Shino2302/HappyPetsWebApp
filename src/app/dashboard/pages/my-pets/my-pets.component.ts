import { Component, OnInit } from '@angular/core';
import {
  Collapse,
  Dropdown,
  Ripple,
  Carousel,
  initTWE
} from "tw-elements";
@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [],
  templateUrl: './my-pets.component.html',
  styles: ``
})
export default class MyPetsComponent implements OnInit{
  ngOnInit(): void {
    initTWE({ Collapse, Dropdown, Ripple, Carousel });
  }

}
