import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'spar-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [MenuComponent, RouterModule]
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
