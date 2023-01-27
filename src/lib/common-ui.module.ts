import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { GraficasComponent } from './graficas/graficas.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent, GraficasComponent],
  exports: [BannerComponent, GraficasComponent],
})
export class CommonUiModule {}
