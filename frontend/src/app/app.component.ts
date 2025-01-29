import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from "./core/components/content/content.component";
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'spar-root',
  imports: [RouterOutlet, ContentComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spar.frontend';
}
