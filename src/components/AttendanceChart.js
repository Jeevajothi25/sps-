import React from 'react';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  margin-top: 0;
  color: #1a237e;
`;

const AttendanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MonthlyData = styled.div`
  margin-top: 20px;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
  }
`;

const AttendanceChart = ({ data }) => {
  const totalDays = Object.values(data).reduce((a, b) => a + b, 0);
  const workingDays = 110; // Total working days
  const attendancePercentage = (totalDays / workingDays * 100).toFixed(2);

  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [totalDays, workingDays - totalDays],
        backgroundColor: ['#4CAF50', '#f44336'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <ChartContainer>
      <Title>Attendance Analysis</Title>
      <AttendanceInfo>
        <div>
          <h4>Attendance Percentage</h4>
          <p>{attendancePercentage}%</p>
        </div>
      </AttendanceInfo>
      <div style={{ height: '200px' }}>
        <Pie data={chartData} options={options} />
      </div>
      <MonthlyData>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Days Present</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([month, days]) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </MonthlyData>
    </ChartContainer>
  );
};

export default AttendanceChart; 