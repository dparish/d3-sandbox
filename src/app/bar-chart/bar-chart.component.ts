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

    let width = 420;
    let barHeight = 20;
    let x = d3.scale.linear()
      .range([0, width]);

    let chart = d3.select(this.element.nativeElement)
      .attr('height', barHeight * data.length)
      .attr('width', width);

    x.domain([0, d3.max(data, (d: KeyValue) => d.value)]);

    let bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d: KeyValue, i: number): string => 'translate(0,' + i * barHeight + ')');

    bar.append('rect')
      .attr('width', (d: KeyValue) => x(d.value))
      .attr('height', barHeight - 1);

    bar.append('text')
      .attr('x', (d: KeyValue) => x(d.value) - 3)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text((d: KeyValue) => d.value);
  }


}

interface KeyValue {
  name: string;
  value: number;
}
