import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IDM-UI-Angular';
  showHeadAndFoot = false;

  constructor(private router: Router, private http: HttpClient) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login') {
          this.showHeadAndFoot = false;
        } else if (event.url === '/') {
          this.showHeadAndFoot = false;
        } else {
          this.showHeadAndFoot = true;
        }
      }
    });
  }
}
