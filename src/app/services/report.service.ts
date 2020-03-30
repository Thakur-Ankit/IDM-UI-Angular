import {Injectable} from '@angular/core';
import {URLs} from '../url';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  fetchSummaryData() {
    return this.http.get<any>(URLs.REPORT_SUMMARY);
  }

  fetchGraphData() {
    /*const filterData = {
      start: '2020-03-10',
      end: '2020-03-16',
      productType: '-1',
      agenciesIdsList: null,
      advertisersIdsList: null,
      campaignsIdsList: null
    };*/
    return this.http.get<any>(URLs.REPORT_GRAPH);
  }
}
