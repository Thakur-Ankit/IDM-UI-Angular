import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CampaignService} from '../services/campaign.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface CampaignData {
  id: number;
  name: string;
  product: string;
  status: string;
  startDate: string;
  endDate: string;
  eligibleVisitors: number;
  returningVisitors: number;
  totalMailersSent: number;
  budget: number;
  spent: number;
}

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'id', 'product', 'status', 'startDate', 'endDate', 'eligibleVisitors',
    'returningVisitors', 'totalMailersSent', 'budget', 'spent', 'edit'];
  campaignData: CampaignData[] = [];
  customDataSource;

  constructor(private router: Router, private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.getCampaigns();
  }

  getCampaigns() {
    this.campaignService.getCampaigns()
      .subscribe(
        response => {
          response.forEach(campaign => {
            this.campaignData.push(this.convertToCampaignData(campaign));
          });
          this.customDataSource = new MatTableDataSource(this.campaignData);
          this.customDataSource.sort = this.sort;
          this.customDataSource.paginator = this.paginator;
        },
        error => console.log('Error fetching campaign dashboard data', error)
      );
  }

  convertToCampaignData(campaign): CampaignData {
    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      eligibleVisitors: campaign.totalVisits,
      totalMailersSent: campaign.totalMailerSent,
      budget: campaign.budget,
      spent: campaign.totalSpent,
      product: campaign.product,
      returningVisitors: campaign.revisitingUsers
    };
  }

  applyFilter(filterValue: string) {
    this.customDataSource.filter = filterValue.trim().toLowerCase();
  }

  navigate(location: string) {
    this.router.navigate([location]);
  }
}
