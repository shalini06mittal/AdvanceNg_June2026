import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { pan } from 'chartjs-plugin-zoom';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  

  @ViewChild('lineChart', {read: BaseChartDirective})
  linechart?: BaseChartDirective;

  @ViewChild('lineChart1', {read: BaseChartDirective})
  linechart1?: BaseChartDirective;

  ngAfterViewInit(): void {
   console.log(this.linechart1?.chart);
   
  }

  lineChartData: ChartConfiguration<'line'>['data']={
    labels : ['Jan','Feb','March','Apr','May','June'],
    datasets:[
      {
        data: [10,20,30,40,50,60],
        label: 'Sales'
      }
    ]
  }

   lineChartData1: ChartConfiguration<'line'>['data']={
    labels : ['Jan','Feb','March','Apr','May','June'],
    datasets:[
      {
        data: [23,56,34,78,90,50],
        label: 'Revenue',
        borderColor:'#f12ac3',
        backgroundColor:'rgba(21, 101, 200, 0.5)',
        fill:true,
        tension:0.4
      }
    ]
  }
  lineChartOptions1: ChartOptions ={
    responsive:true,
    animation : {duration: 4000, easing: 'linear'},
    plugins:{
      legend: {position: 'bottom'}
    }
  }

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    aspectRatio:4,
    maintainAspectRatio:true,
    plugins:{
      zoom:{
        pan:{
          enabled:true,
          mode:'x'
        },
      zoom:{
        wheel:{
          enabled:true
        },
        pinch:{
          enabled:true
        },
        drag:{
          enabled:true
        },
        mode:'x'
      }
      }
    }
  };

public barChartData: ChartData<'bar'> = {
  labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B'
    }
  ]
};
  reloadChart(){
   // alert('click')
    this.lineChartData1.datasets[0].data = 
    Array.from({length:6}, ()=> Math.floor(Math.random() * 100));
    console.log(this.lineChartData1.datasets[0].data);
    
    this.linechart1?.chart?.update();
  }

}
