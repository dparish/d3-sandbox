/**
 * Chart example sandbox
 * from: https://bost.ocks.org/mike/bar/3
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import * as d3 from 'd3';

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

    let margin = {top: 20, right: 30, bottom: 30, left: 40};
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    let x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

    let y = d3.scale.linear()
      .range([height, 0]);

    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    let chart = d3.select(this.element.nativeElement)
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.left + margin.right)
      .append("g")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(data.map((d: KeyValue) => d.name));
    y.domain([0, d3.max(data, (d: KeyValue) => d.value)]);

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', (d: KeyValue) => y(d.value))
      .attr('x', (d: KeyValue) => x(d.name))
      .attr('height', (d: KeyValue) => height - y(d.value))
      .attr('width', x.rangeBand());
  }
}

interface KeyValue {
  name: string;
  value: number;
}
