import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TimeOffStatistics = ({ data }) => {
  const [chartType, setChartType] = useState('month');
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: getLabelsByChartType(chartType), 
      datasets: [
        {
          label: 'Sick Leave',
          backgroundColor: '#0BB2E3',
          //borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: getRandomData(),
        },
        {
          label: 'Paid Leave',
          backgroundColor: '#FFD459',
         // borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: getRandomData(),
        },
        {
          label: 'Unpaid Leave',
          backgroundColor: '#DC146C',
          //borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: getRandomData(),
        },
      ],
    };

    
    const options = {
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('timeOffChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }, [chartType]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const getLabelsByChartType = (type) => {
    switch (type) {
      case 'month':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      case 'week':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'year':
        return ['Q1', 'Q2', 'Q3', 'Q4'];
      default:
        return [];
    }
  };

  const getRandomData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 20));
  };

  return (
    <div className="stat-card">
      <div className="chart-container">
        <canvas id="timeOffChart"></canvas>
      </div>
    </div>
  );
};

export default TimeOffStatistics;
