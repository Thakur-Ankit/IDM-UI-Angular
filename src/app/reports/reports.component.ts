import {Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  private reportData = {
    eligibleVisitors: null,
    returningVisitors: null,
    totalSent: null,
    totalSpent: null,
    totalCost: null
  };

  constructor(private reportService: ReportService, private router: Router, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.fetchReportSummary();
    this.fetchReportGraph();
  }

  fetchReportSummary() {
    this.spinner.show('reportSpinner');
    this.reportService.fetchSummaryData()
      .subscribe(
        response => {
          this.spinner.hide('reportSpinner');
          this.reportData.eligibleVisitors = response.totalVisit;
          this.reportData.returningVisitors = response.totalReturningVisits;
          this.reportData.totalSent = response.totalSent;
          this.reportData.totalSpent = response.totalSpent;
          this.reportData.totalCost = response.totalCost;
        },
        error => {
          this.spinner.hide('reportSpinner');
          console.log('Error fetching report summary', error);
        }
      );
  }

  fetchReportGraph() {
    this.reportService.fetchGraphData()
      .subscribe(
        response => {
          console.log('Report graph fetched successfully!');
        },
        error => console.log('Error fetching report graph', error)
      );
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }

}
