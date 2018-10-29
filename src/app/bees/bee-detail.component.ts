import {
  Component, OnInit, Input, EventEmitter, Output
} from '@angular/core';
import { Bee } from '../models/bee';

@Component({
  selector: 'app-bee-detail',
  templateUrl: './bee-detail.component.html',
  styleUrls: ['./bee-detail.component.scss']
})
export class BeeDetailComponent implements OnInit {
  @Output()
  public wantsEdit: EventEmitter<boolean>;

  @Input()
  public bee: Bee;

  constructor() {
    this.wantsEdit = new EventEmitter<boolean>();
  }

  public ngOnInit(): void {
  }

  public signalEdit(): void {
    this.wantsEdit.next(true);
  }
}
