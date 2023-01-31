import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { fromEvent, takeUntil } from 'rxjs'; 
import { TimezoneService } from '../services/timezone.service';

import * as echarts from 'echarts/core';
  import { BarChart } from 'echarts/charts';

  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
  } from 'echarts/components';

  import { LabelLayout, UniversalTransition } from 'echarts/features';

  import { CanvasRenderer } from 'echarts/renderers';

  echarts.use([
    BarChart,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);

@Component({
  selector: 'myorg-long-polling',
  templateUrl: './long-polling.component.html',
  styleUrls: ['./long-polling.component.css'],
})
export class LongPollingComponent implements OnInit, AfterViewInit {

  @ViewChild('bar') bar!: ElementRef;
  myChart!: echarts.ECharts;

  barOption = {
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    legend: {
      data: ['Tiempo'],
      top: 30
    },
    xAxis: {
      data: ['Hora', 'Minutos', 'Segundos']
    },
    yAxis: {},
    series: [
      {
        name: 'Tiempo',
        type: 'bar',
        data: [
                {
                  value: 0,
                  itemStyle: {color: '#EE6666'},
                },
                {
                  value: 0,
                  itemStyle: {color: '#5470C6'},
                },
                {
                  value: 0,
                  itemStyle: {color: '#5470C6'},
                }
              ]
        
      }
    ]
  };

  constructor( private timeZoneService: TimezoneService ){}

  ngOnInit(): void {
    const boton = document.createElement('button');

    boton.innerHTML = 'Detener timer';
    document.querySelector('body')?.append( boton );

    const clickBtn$ = fromEvent( boton, 'click' );

    this.timeZoneService.getTime()
      .pipe(
        takeUntil( clickBtn$ )
      )
      .subscribe({
        next:  data => 
          {
            console.log( data.datetime )
            const time = new Date(data.datetime); 
            this.myChart.hideLoading();
            this.myChart.setOption({
              xAxis: {
                data: ['Hora', 'Minutos', 'Segundos']
              },
              series: [
                {
                  // Find series by name
                  name: 'Tiempo',
                  data: [
                    {
                      value: time.getHours(),
                      itemStyle: {color: '#EE6666'},
                    },
                    {
                      value: time.getMinutes(),
                      itemStyle: {color: '#5470C6'},
                    },
                    {
                      value: time.getSeconds(),
                      itemStyle: {color: '#5470C6'},
                    }
                  ]
                }
              ]
            });
          },
        error: () => {
                  console.error('Error en el appComponent');
                }
      });
  }

  ngAfterViewInit(): void {
    this.myChart = echarts.init(this.bar.nativeElement);
    this.myChart.showLoading();
    this.myChart.setOption(this.barOption);
  }
  
  
}
