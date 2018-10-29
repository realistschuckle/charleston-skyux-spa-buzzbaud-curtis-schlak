import { NgModule } from '@angular/core';
import { BeeDataService } from './shared/bee-data.service';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [BeeDataService],
  entryComponents: []
})
export class AppExtrasModule { }
