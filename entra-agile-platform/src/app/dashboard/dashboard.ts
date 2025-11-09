import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../project.service';
import { ProjectCardComponent } from '../project-card/project-card';
import { ProjectModalComponent } from '../project-modal/project-modal';
import anime from 'animejs/lib/anime.es.js';
import Typed from 'typed.js';
import Splitting from 'splitting';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements AfterViewInit {
  private projectService = inject(ProjectService);
  projects = this.projectService.projects;

  isProjectModalVisible = false;

  ngAfterViewInit() {
    this.initializeAnimations();
    this.initializeCharts();
  }

  openProjectModal() {
    this.isProjectModalVisible = true;
  }

  closeProjectModal() {
    this.isProjectModalVisible = false;
  }

  private initializeAnimations() {
    Splitting();

    anime({
      targets: '.splitting-text .char',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1400,
      delay: (el, i) => 30 * i,
    });

    new Typed('#typed-text', {
      strings: [
        'Manage projects with intuitive Kanban boards',
        'Track sprints and team velocity in real-time',
        'Create user stories with bug and task management',
        'Collaborate seamlessly with your entire team',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
    });
  }

  private initializeCharts() {
    // Sprint Velocity Chart
    const velocityChart = echarts.init(
      document.getElementById('velocityChart')
    );
    const velocityOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5'],
        axisLine: {
          lineStyle: {
            color: '#374151',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#374151',
          },
        },
      },
      series: [
        {
          name: 'Story Points',
          type: 'bar',
          data: [24, 31, 28, 35, 29],
          itemStyle: {
            color: '#319795',
          },
          barWidth: '60%',
        },
      ],
    };
    velocityChart.setOption(velocityOption);

    // Project Progress Chart
    const progressChart = echarts.init(
      document.getElementById('progressChart')
    );
    const progressOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Project Status',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 4, name: 'Active', itemStyle: { color: '#319795' } },
            { value: 1, name: 'Planning', itemStyle: { color: '#3b82f6' } },
            { value: 1, name: 'Completed', itemStyle: { color: '#6b7280' } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    progressChart.setOption(progressOption);

    // Make charts responsive
    window.addEventListener('resize', function () {
      velocityChart.resize();
      progressChart.resize();
    });
  }
}
