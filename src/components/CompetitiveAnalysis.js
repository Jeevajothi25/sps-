import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const CompetitiveAnalysis = () => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Class M',
        data: [9.0, 9.1, 9.2, 9.0],
        backgroundColor: '#1a237e',
      },
      {
        label: 'N CGPA',
        data: [9.15, 9.13, 9.14, 9.0],
        backgroundColor: '#4CAF50',
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
        text: 'Competitive Analysis of CGPA with respect to Class Highest CGPA'
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
      <ChartTitle>Competitive Analysis</ChartTitle>
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default CompetitiveAnalysis; 