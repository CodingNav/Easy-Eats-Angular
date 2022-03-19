import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-eats-angular';

  // goes to top when you go to a new page
  // everytime a route is activated, run this function
  onActivate() {
    window.scrollTo(0, 0); // goes to top of page
  }
}
