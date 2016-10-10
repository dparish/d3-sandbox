import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @ViewChild('chart') element: ElementRef;

  constructor() { }

  ngOnInit() {
    let data = [4, 8, 15, 16, 23, 42];

    let x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

    d3.select(this.element.nativeElement)
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('width', (d: number): string => { return x(d) + 'px'; })
      .classed('bar', true)
      .text(function(d: number):string { return d + ''; });
  }

}
