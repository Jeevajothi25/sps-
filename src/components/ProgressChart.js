import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  color: #1a237e;
`;

const ProgressChart = () => {
  const data = {
    labels: ['Semester 01', 'Semester 02', 'Semester 03', 'Semester 04'],
    datasets: [
      {
        label: 'CGPA Progress',
        data: [9.15, 9.13, 9.14, 9.00],
        fill: false,
        borderColor: '#1a237e',
        tension: 0.1,
        pointBackgroundColor: '#1a237e',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progressive rise in CGPA Semester-wise'
      }
    },
    scales: {
      y: {
        min: 8.5,
        max: 9.5,
        ticks: {
          stepSize: 0.1
        }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartTitle>CGPA Progress</ChartTitle>
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default ProgressChart; 