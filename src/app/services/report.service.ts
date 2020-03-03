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
    return this.http.get<any>(URLs.REPORT_GRAPH);
  }
}
