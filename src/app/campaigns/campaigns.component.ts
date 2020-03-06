import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
