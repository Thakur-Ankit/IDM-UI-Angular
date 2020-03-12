import {Injectable} from '@angular/core';
import {URLs} from '../url';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvertiserService {

  constructor(private http: HttpClient) {
  }

  getAdvertisers() {
    return this.http.get<any>(URLs.ADVERTISER_DASHBOARD);
  }
}
