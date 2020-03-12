import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AdvertiserService} from '../services/advertiser.service';

export interface AdvertiserData {
  id: number;
  name: string;
  eligibleVisitors: number;
  returningVisitors: number;
  totalMailersSent: number;
  budget: number;
  spent: number;
  status: boolean;
  activeDate: number;
  createdDate: number;
}

@Component({
  selector: 'app-advertisers',
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.css']
})
export class AdvertisersComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'id', 'eligibleVisitors', 'returningVisitors', 'totalMailersSent', 'budget', 'spent', 'edit', 'status'];
  advertiserData: AdvertiserData[] = [];
  customDataSource;

  constructor(private router: Router, private advertiserService: AdvertiserService) {
  }

  ngOnInit() {
    this.getAdvertisers();
  }

  getAdvertisers() {
    this.advertiserService.getAdvertisers()
      .subscribe(
        response => {
          response.forEach(advertiser => {
            this.advertiserData.push(this.convertToAdvertiserData(advertiser));
          });
          this.customDataSource = new MatTableDataSource(this.advertiserData);
          this.customDataSource.sort = this.sort;
          this.customDataSource.paginator = this.paginator;
        },
        error => console.log('Error fetching advertiser dashboard data', error)
      );
  }

  convertToAdvertiserData(advertiser): AdvertiserData {
    return {
      id: advertiser.id,
      name: advertiser.name,
      eligibleVisitors: advertiser.totalVisits,
      returningVisitors: advertiser.returningVisitors,
      totalMailersSent: advertiser.totalMailerSent,
      budget: advertiser.budget,
      spent: advertiser.totalSpent,
      status: advertiser.active,
      activeDate: advertiser.activeDate,
      createdDate: advertiser.createdDate
    };
  }

  applyFilter(filterValue: string) {
    this.customDataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
