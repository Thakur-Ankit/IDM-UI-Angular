import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import * as Chart from 'chart.js';

export interface ReportGraphData {
  categories: Array<string>;
  seriesMap: {
    TotalSent: Array<string>,
    TotalVisits: Array<string>,
    percent: Array<string>
  };
}

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

  reportGraphData: ReportGraphData;
  @ViewChild('totalEligibleChart', null) private chartRef;
  chart: any;

  constructor(private reportService: ReportService, private router: Router, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.fetchReportSummary();
    this.fetchReportGraph(null);
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

  fetchReportGraph(numberOfDays: number) {
    this.spinner.show('reportGraphSpinner');
    this.reportService.fetchGraphData()
      .subscribe(
        (response: ReportGraphData) => {
          this.spinner.hide('reportGraphSpinner');
          console.log(response);
          this.reportGraphData = response;
          console.log('Report graph fetched successfully!');
          const length = this.reportGraphData.categories.length;
          console.log('Report graph data length : ', length);
          const newCategories: Array<string> = [];
          const newTotalSent: Array<string> = [];
          const newTotalVisits: Array<string> = [];
          const newPercent: Array<string> = [];
          let filterDaysValue = 30;
          if (numberOfDays != null) {
            filterDaysValue = numberOfDays;
          }
          for (let i = length - filterDaysValue; i <= length - 1; i++) {
            newCategories.push(this.reportGraphData.categories[i]);
            newTotalSent.push(this.reportGraphData.seriesMap.TotalSent[i]);
            newTotalVisits.push(this.reportGraphData.seriesMap.TotalVisits[i]);
            newPercent.push(this.reportGraphData.seriesMap.percent[i]);
          }
          this.reportGraphData.categories = newCategories;
          this.reportGraphData.seriesMap = {
            TotalSent: newTotalSent,
            TotalVisits: newTotalVisits,
            percent: newPercent
          };
          this.getReportGraphChart(this.reportGraphData);
        },
        error => console.log('Error fetching report graph', error)
      );
  }

  getReportGraphChart(reportGraphData: ReportGraphData) {
    const option = {
      legend: {display: true},
      scales: {
        xAxes: [{gridLines: {display: false}, stacked: true}],
        yAxes: [
          {id: 'y-axis-0', position: 'left', gridLines: {display: false}, stacked: true},
          {id: 'y-axis-1', position: 'right', gridLines: {display: false}, stacked: true}
        ]
      },
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            const legend = [];
            for (const i in data.datasets) {
              legend.push(data.datasets[i].label + ': ' + parseFloat(data.datasets[i].data[tooltipItem.index]));
            }
            return legend;
          }
        }
      }
    };
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      options: option,
      data: {
        labels: reportGraphData.categories,
        datasets: [this.createTotalSentChart(reportGraphData), this.createEligibleVistorsChart(reportGraphData),
          { yAxisID: 'y-axis-1',  type: 'line', fill: false, backgroundColor: '#459918',
            data: reportGraphData.seriesMap.percent, label: 'Percent '}]
      },
    });
  }

  createTotalSentChart(reportGraphData: ReportGraphData): object {
    let totalSent = [];
    totalSent = reportGraphData.seriesMap.TotalSent;
    return {yAxisID: 'y-axis-0', backgroundColor: '#8d6899', data: totalSent, label: 'Total Sent '};
  }

  createEligibleVistorsChart(reportGraphData: ReportGraphData): object {
    let eligibleVisitors = [];
    eligibleVisitors = reportGraphData.seriesMap.TotalVisits;
    return {yAxisID: 'y-axis-0', backgroundColor: '#2196F3', data: eligibleVisitors, label: 'Eligible Visitors '};
  }

  setFilterDays(numberOfDays: number) {
    this.chart.destroy();
    this.fetchReportGraph(numberOfDays);
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }

}
