import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
