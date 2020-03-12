import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AgencyService} from '../services/agency.service';
import {NgxSpinnerService} from 'ngx-spinner';

export interface AgencyData {
  id: number;
  name: string;
  eligibleVisitors: number;
  returningVisitors: number;
  totalMailersSent: number;
  spend: number;
  cost: number;
}

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'id', 'eligibleVisitors', 'returningVisitors', 'totalMailersSent', 'spend', 'cost', 'edit'];
  customDataSource;
  agencyData: AgencyData[] = [];

  constructor(private router: Router, private agencyService: AgencyService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getAgencies();
  }

  getAgencies() {
    this.spinner.show('agenciesSpinner');
    this.agencyService.getAgencies()
      .subscribe(
        response => {
          this.spinner.hide('agenciesSpinner');
          response.forEach(agency => {
            this.agencyData.push(this.convertToAgencyData(agency));
          });
          this.customDataSource = new MatTableDataSource(this.agencyData);
          this.customDataSource.sort = this.sort;
          this.customDataSource.paginator = this.paginator;
        },
        error => {
          this.spinner.hide('agenciesSpinner');
          console.log('Error fetching agency dashboard data', error);
        }
      );
  }

  convertToAgencyData(agency): AgencyData {
    return {
      id: agency.agencyId,
      name: agency.agencyName,
      eligibleVisitors: agency.totalVisits,
      totalMailersSent: agency.totalMailerSent,
      returningVisitors: agency.returningVisitors,
      spend: agency.totalSpent,
      cost: agency.cost
    };
  }

  applyFilter(filterValue: string) {
    this.customDataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
