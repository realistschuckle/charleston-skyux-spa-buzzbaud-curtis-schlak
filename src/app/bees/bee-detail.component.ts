import {
  Component, Input
} from '@angular/core';
import { Bee } from '../models/bee';

@Component({
  selector: 'app-bee-detail',
  templateUrl: './bee-detail.component.html',
  styleUrls: ['./bee-detail.component.scss']
})
export class BeeDetailComponent {
  @Input()
  public bee: Bee;
}
