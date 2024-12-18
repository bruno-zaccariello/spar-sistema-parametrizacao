import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'spar-menu',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  navigation = [
    {
      title: 'Parametro',
      link: '/parametro'
    }, {
      title: 'Sistema',
      link: '/sistema'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
