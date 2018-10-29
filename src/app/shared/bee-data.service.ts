import { Injectable } from '@angular/core';
import { SkyAuthHttp } from '@blackbaud/skyux-builder/runtime';
import { Observable } from 'rxjs/Observable';
import { Bee } from '../models/bee';

@Injectable()
export class BeeDataService {
  constructor(
    private _http: SkyAuthHttp
  ) {}

  public getBees(): Observable<Bee[]> {
    return this._http
      .get('https://buzzbaud.curtissimo.com/v1/bees')
      .map(response => response.json())
      .map(data => data.bees);
  }

  public updateBee(bee: Bee): Observable<Bee> {
    return this._http
      .put(`https://buzzbaud.curtissimo.com/v1/bees/${bee.id}`, bee)
      .map(response => response.json());
  }
}
