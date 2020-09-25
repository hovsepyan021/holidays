import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {HolidaysRoutingModule} from "./holidays-routing.module";
import {HolidaysPage} from "./holidays.page";
import {DataService} from "../services/data.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolidaysRoutingModule
  ],
  declarations: [HolidaysPage],
  providers: [DataService]
})
export class HolidaysPageModule {}
