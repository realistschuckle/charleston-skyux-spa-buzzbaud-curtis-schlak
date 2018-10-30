import {
  Component, OnInit, Input, OnChanges, SimpleChanges
} from '@angular/core';
import { Bee } from '../models/bee';
import { BeeDataService } from '../shared/bee-data.service';
import { Observable } from 'rxjs/Observable';
import { SkyWaitService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'app-bee-list',
  templateUrl: './bee-list.component.html',
  styleUrls: ['./bee-list.component.scss']
})
export class BeeListComponent implements OnInit, OnChanges {
  @Input()
  public beeId: string;

  @Input()
  public isEditing: boolean;

  public bees: Bee[];
  public selectedBee: Bee;
  public isLoading: Observable<boolean>;

  constructor(
    private _data: BeeDataService,
    waiter: SkyWaitService
  ) {
    this.isLoading = _data.isLoading;
    _data.isLoading.subscribe(value => {
      if (value) {
        waiter.beginBlockingPageWait();
      } else {
        waiter.endBlockingPageWait();
      }
    });
  }

  public selectBee(bee: Bee) {
    this.selectedBee = bee;
  }

  public ngOnInit(): void {
    this._data
      .getBees()
      .subscribe(bees => {
        this.bees = bees;
        this.setSelectedBee(this.beeId);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    const id = changes.beeId.currentValue;
    this.setSelectedBee(id);
  }

  public handleEdit(bee: Bee): void {
    this._data
      .updateBee(bee)
      .subscribe(() => {
        this.ngOnInit();
        this.selectedBee = undefined;
      });
  }

  private setSelectedBee(id: string): void {
    if (this.bees && id) {
      const bee = this.bees.find(b => b.id === id);
      if (bee) {
        this.selectedBee = { ...bee };
      } else {
        this.selectedBee = undefined;
      }
    }
  }
}
