import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';

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
  PieChart,
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
  selector: 'myorg-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements AfterViewInit, OnDestroy {

  @ViewChild('bar') bar!: ElementRef;
  @ViewChild('pie') pie!: ElementRef;

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  barOption = {
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    legend: {
      data: ['sales'],
      top: 30
    },
    xAxis: {
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [
                {
                  value: 5,
                  itemStyle: {color: '#EE6666'},
                },
                {
                  value: 20,
                  itemStyle: {color: '#5470C6'},
                },
                {
                  value: 36,
                  itemStyle: {color: '#5470C6'},
                },
                {
                  value: 10,
                  itemStyle: {color: '#5470C6'},
                },
                {
                  value: 10,
                  itemStyle: {color: '#5470C6'},
                },
                {
                  value: 20,
                  itemStyle: {color: '#5470C6'}
                }
              ]
        
      }
    ]
  };

  pieOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  constructor(){}

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const myChart = echarts.init(this.bar.nativeElement);
    const myChart1 = echarts.init(this.pie.nativeElement);
    
    myChart.setOption(this.barOption);

    myChart1.setOption(this.pieOption);

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      myChart.resize();
      myChart1.resize();
    })
  }
  
 
}
