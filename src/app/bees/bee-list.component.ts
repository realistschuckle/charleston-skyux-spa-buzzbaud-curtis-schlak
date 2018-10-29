import {
  Component, OnInit
} from '@angular/core';
import { Bee } from '../models/bee';
import { BeeDataService } from '../shared/bee-data.service';

@Component({
  selector: 'app-bee-list',
  templateUrl: './bee-list.component.html',
  styleUrls: ['./bee-list.component.scss']
})
export class BeeListComponent implements OnInit {
  public bees: Bee[];
  public selectedBee: Bee;
  public isEditing: boolean;

  constructor(
    private _data: BeeDataService
  ) {}

  public selectBee(bee: Bee) {
    this.selectedBee = bee;
  }

  public ngOnInit(): void {
    this._data
      .getBees()
      .subscribe(bees => this.bees = bees);
  }

  public changeToEditForm(): void {
    this.selectedBee = { ...this.selectedBee };
    this.isEditing = true;
  }

  public handleEdit(bee: Bee): void {
    this._data
      .updateBee(bee)
      .subscribe(() => {
        this.ngOnInit();
        this.selectedBee = undefined;
      });
  }
}
