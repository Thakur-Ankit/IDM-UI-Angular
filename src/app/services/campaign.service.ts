import {Injectable} from '@angular/core';
import {URLs} from '../url';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) {
  }

  getCampaigns() {
    return this.http.get<any>(URLs.CAMPAIGN_DASHBOARD);
  }
}
