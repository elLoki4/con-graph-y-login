import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { GraphRoutingModule } from './graph-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraphComponent],
  imports: [CommonModule, GraphRoutingModule, NgChartsModule],
})
export class GraphModule {}
