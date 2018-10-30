import { Injectable } from '@angular/core';
import { SkyAuthHttp, SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { Observable } from 'rxjs/Observable';
import { Bee } from '../models/bee';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/do';

@Injectable()
export class BeeDataService {
  private _isLoading: BehaviorSubject<boolean>;
  private _url: string;

  constructor(
    private _http: SkyAuthHttp,
    config: SkyAppConfig
  ) {
    this._isLoading = new BehaviorSubject<boolean>(false);
    this._url = config.skyux.appSettings.buzzbaudSvcUrl;
  }

  public get isLoading(): Observable<boolean> {
    return this._isLoading;
  }

  public getBees(): Observable<Bee[]> {
    this._isLoading.next(true);
    return this._http
      .get(`${this._url}/bees`)
      .map(response => response.json())
      .map(data => data.bees)
      .do(() => this._isLoading.next(false));
  }

  public updateBee(bee: Bee): Observable<Bee> {
    this._isLoading.next(true);
    return this._http
      .put(`${this._url}/bees/${bee.id}`, bee)
      .map(response => response.json())
      .do(() => this._isLoading.next(false));
  }
}
