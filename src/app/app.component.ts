import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaunchesComponent } from './launches/launches.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LaunchesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SpaceX_Launches';
}
