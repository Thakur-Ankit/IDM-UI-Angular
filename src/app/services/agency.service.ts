import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLs} from '../url';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) {
  }

  getAgencies() {
    return this.http.get<any>(URLs.AGENCY_DASHBOARD);
  }
}
