import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { GraficasComponent } from './graficas/graficas.component';
import { LongPollingComponent } from './long-polling/long-polling.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent, GraficasComponent, LongPollingComponent],
  exports: [BannerComponent, GraficasComponent, LongPollingComponent],
})
export class CommonUiModule {}
