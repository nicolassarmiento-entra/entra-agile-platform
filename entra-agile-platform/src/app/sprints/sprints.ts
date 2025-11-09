import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintService } from '../sprint.service';
import anime from 'animejs/lib/anime.es.js';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sprints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprints.html',
  styleUrl: './sprints.css',
})
export class SprintsComponent implements AfterViewInit {
  private sprintService = inject(SprintService);
  sprints = this.sprintService.sprints;

  ngAfterViewInit() {
    this.initializeCharts();
  }

  private initializeCharts() {
    // Burndown Chart
    const burndownChart = echarts.init(
      document.getElementById('burndownChart')
    );
    const burndownOption = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Ideal', 'Actual'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [
          'Day 1',
          'Day 2',
          'Day 3',
          'Day 4',
          'Day 5',
          'Day 6',
          'Day 7',
          'Day 8',
          'Day 9',
          'Day 10',
        ],
      },
      yAxis: {
        type: 'value',
        name: 'Story Points',
      },
      series: [
        {
          name: 'Ideal',
          type: 'line',
          data: [31, 28, 25, 22, 19, 16, 13, 10, 7, 4, 0],
          itemStyle: { color: '#e5e7eb' },
          lineStyle: { type: 'dashed' },
        },
        {
          name: 'Actual',
          type: 'line',
          data: [31, 29, 26, 24, 20, 18, 15, 11, 8, 6, 2],
          itemStyle: { color: '#319795' },
        },
      ],
    };
    burndownChart.setOption(burndownOption);

    // Velocity Trend Chart
    const velocityChart = echarts.init(
      document.getElementById('velocityTrendChart')
    );
    const velocityOption = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'],
      },
      yAxis: {
        type: 'value',
        name: 'Story Points',
      },
      series: [
        {
          name: 'Velocity',
          type: 'bar',
          data: [24, 31, 28, 35, 29, 33],
          itemStyle: {
            color: '#f6ad55',
          },
          barWidth: '60%',
        },
      ],
    };
    velocityChart.setOption(velocityOption);

    // Make charts responsive
    window.addEventListener('resize', function () {
      burndownChart.resize();
      velocityChart.resize();
    });
  }
}
