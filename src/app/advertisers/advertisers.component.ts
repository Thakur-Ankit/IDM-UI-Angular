import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advertisers',
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.css']
})
export class AdvertisersComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
