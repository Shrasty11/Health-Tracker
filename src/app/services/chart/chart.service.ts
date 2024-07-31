import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { User } from '../../components/users/users.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chart: Chart | null = null; // Private field to hold the Chart instance

  constructor() {}

  createChart(chartRef: HTMLCanvasElement, user: User) {
    const ctx = chartRef.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', 
        data: {
          labels: user.workouts.map(workout => workout.type),
          datasets: [
            {
              label: 'Minutes', // Label for the dataset
              data: user.workouts.map(workout => workout.minutes), // Workout minutes as data
              borderWidth: 1, // Border width for the bars
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true, // Y-axis starts at zero
            },
          },
        },
      });
    } else {
      console.error('Failed to get 2D context from canvas.');
    }
  }

  updateChart(user: User) {
    if (this.chart) {
      this.chart.data.labels = user.workouts.map((w: any) => w.type);
      this.chart.data.datasets[0].data = user.workouts.map(
        (w: any) => w.minutes
      );
      this.chart.update();
    }
  }
}
