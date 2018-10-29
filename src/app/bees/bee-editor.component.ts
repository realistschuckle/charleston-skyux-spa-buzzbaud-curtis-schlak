import {
  Component, Input, EventEmitter, Output
} from '@angular/core';
import { Bee } from '../models/bee';

@Component({
  selector: 'app-bee-editor',
  templateUrl: './bee-editor.component.html',
  styleUrls: ['./bee-editor.component.scss']
})
export class BeeEditorComponent {
  @Input()
  public bee: Bee;

  @Output()
  public wantsToSave: EventEmitter<Bee>;

  constructor() {
    this.wantsToSave = new EventEmitter<Bee>();
  }

  public updateBee(): void {
    this.wantsToSave.next(this.bee);
  }
}
