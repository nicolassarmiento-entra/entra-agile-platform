import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoryService } from '../user-story.service';
import * as anime from 'animejs';
import * as echarts from 'echarts';
import Sortable, { SortableEvent } from 'sortablejs';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class KanbanComponent implements AfterViewInit {
  private userStoryService = inject(UserStoryService);
  userStories = this.userStoryService.userStories;

  ngAfterViewInit() {
    this.initializeCharts();
    this.setupDragAndDrop();
  }

  private initializeCharts() {
    // Story Distribution Chart
    const distributionChart = echarts.init(
      document.getElementById('storyDistributionChart')
    );
    const distributionOption = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Stories',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 3, name: 'Pending', itemStyle: { color: '#f59e0b' } },
            { value: 1, name: 'Doing', itemStyle: { color: '#3b82f6' } },
            { value: 2, name: 'Done', itemStyle: { color: '#10b981' } },
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
    distributionChart.setOption(distributionOption);

    // Priority Breakdown Chart
    const priorityChart = echarts.init(
      document.getElementById('priorityChart')
    );
    const priorityData = [
      { value: 3, name: 'High', itemStyle: { color: '#ef4444' } },
      { value: 2, name: 'Medium', itemStyle: { color: '#f59e0b' } },
      { value: 1, name: 'Low', itemStyle: { color: '#10b981' } },
    ];

    const priorityOption = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Priority',
          type: 'pie',
          radius: '70%',
          data: priorityData,
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
    priorityChart.setOption(priorityOption);

    // Team Performance Chart
    const performanceChart = echarts.init(
      document.getElementById('performanceChart')
    );
    const performanceOption = {
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
        data: ['Sarah', 'Mike', 'Alex', 'Emma'],
        axisLine: {
          lineStyle: {
            color: '#374151',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'Story Points',
        axisLine: {
          lineStyle: {
            color: '#374151',
          },
        },
      },
      series: [
        {
          name: 'Completed',
          type: 'bar',
          data: [16, 13, 8, 5],
          itemStyle: {
            color: '#10b981',
          },
          barWidth: '60%',
        },
      ],
    };
    performanceChart.setOption(performanceOption);

    // Make charts responsive
    window.addEventListener('resize', function () {
      distributionChart.resize();
      priorityChart.resize();
      performanceChart.resize();
    });
  }

  private setupDragAndDrop() {
    const columns = ['pendingColumn', 'doingColumn', 'doneColumn'];

    columns.forEach((columnId) => {
      const column = document.getElementById(columnId);
      if (column) {
        new Sortable(column, {
          group: 'kanban',
          animation: 150,
          ghostClass: 'opacity-50',
          chosenClass: 'shadow-lg',
          dragClass: 'shadow-xl',
          onEnd: (evt: SortableEvent) => {
            const storyId = evt.item.dataset['storyId'];
            const newStatus = this.getStatusFromColumn(evt.to!.id);
            if (storyId) {
              this.updateStoryStatus(storyId, newStatus);
            }
          },
        });
      }
    });
  }

  private getStatusFromColumn(columnId: string) {
    switch (columnId) {
      case 'pendingColumn':
        return 'pending';
      case 'doingColumn':
        return 'doing';
      case 'doneColumn':
        return 'done';
      default:
        return 'pending';
    }
  }

  private updateStoryStatus(
    storyId: string,
    newStatus: 'pending' | 'doing' | 'done'
  ) {
    this.userStoryService.updateUserStoryStatus(storyId, newStatus);
  }
}
