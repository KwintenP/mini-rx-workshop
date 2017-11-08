import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../entities/search-result.entity';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WalmartApiService {
  PAGE_SIZE = 10;
  API_KEY = 'sgkdpvaj88kj4z5m7k9r9rs2';

  constructor(private http: HttpClient) {
  }

  searchItems(term: string, page: number): Observable<SearchResult> {
    return this.http
      .get(
        `http://api.walmartlabs.com/v1/search?query=${term}&start=${page * this.PAGE_SIZE + 1}&format=json&facet=on&apiKey=${this.API_KEY}`
      );
  }
}
