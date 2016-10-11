import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import * as d3 from 'd3';
import { element } from 'protractor';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @ViewChild('chartSvg') element: ElementRef;

  constructor() { }

  ngOnInit() {
    let data: KeyValue[] = [
      {name: "Locke",    value:  4},
      {name: "Reyes",    value:  8},
      {name: "Ford",     value: 15},
      {name: "Jarrah",   value: 16},
      {name: "Shephard", value: 23},
      {name: "Kwon",     value: 42}
    ];

    let width = 960;
    let height = 500;
    let y = d3.scale.linear()
      .range([height, 0]);

    let chart = d3.select(this.element.nativeElement)
      .attr('height', height)
      .attr('width', width);

    y.domain([0, d3.max(data, (d: KeyValue) => d.value)]);

    let barWidth = width / data.length;

    let bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d: KeyValue, i: number): string => 'translate(' + i * barWidth + ',0)');

    bar.append('rect')
      .attr('y', (d: KeyValue) => y(d.value))
      .attr('height', (d: KeyValue) => height - y(d.value))
      .attr('width', barWidth - 1);

    bar.append('text')
      .attr('x', barWidth / 2)
      .attr('y', (d: KeyValue) => y(d.value) + 3)
      .attr('dy', '.75em')
      .text((d: KeyValue) => d.value);
  }


}

interface KeyValue {
  name: string;
  value: number;
}
