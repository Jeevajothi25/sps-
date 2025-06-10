import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

const GlobalStyle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
`;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
`;

const Sidebar = styled.div`
  width: 280px;
  background: white;
  padding: 2rem 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  font-family: 'Poppins', sans-serif;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 10px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const MenuItem = styled.li`
  margin-bottom: 0.75rem;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#f0f7ff' : 'transparent'};
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: #f0f7ff;
    color: #3498db;
    transform: translateX(5px);
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const LogoutButton = styled(MenuButton)`
  margin-top: 2rem;
  color: #e74c3c;
  border-top: 1px solid #f1f1f1;
  padding-top: 1.5rem;
  
  &:hover {
    background: #fdf2f2;
    color: #c0392b;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.div`
  h1 {
    color: #2c3e50;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: #3498db;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #7f8c8d;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Poppins', sans-serif;

    svg {
      color: ${props => props.iconColor || '#3498db'};
    }
  }
  
  p {
    color: #2c3e50;
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: ${props => props.trendUp ? '#2ecc71' : '#e74c3c'};

    svg {
      font-size: 1.2rem;
    }
  }
`;

const PerformanceSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h2 {
    color: #2c3e50;
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'Poppins', sans-serif;

    svg {
      color: #3498db;
    }
  }
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PerformanceCard = styled.div`
  background: ${props => props.bgColor || '#f8f9fa'};
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: ${props => props.textColor || '#2c3e50'};
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-family: 'Poppins', sans-serif;
  }

  .stat {
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.textColor || '#2c3e50'};
    margin-bottom: 0.5rem;
  }

  .description {
    color: ${props => props.textColor || '#7f8c8d'};
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const MetricsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-family: 'Poppins', sans-serif;
  }

  th {
    background: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
  }

  td {
    color: #2c3e50;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #f8f9fa;
  }

  .trend-up {
    color: #2ecc71;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .trend-down {
    color: #e74c3c;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DepartmentPerformance = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('performance');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for department performance metrics
  const overallMetrics = [
    { name: 'Overall CGPA', value: '8.45', trend: 'up', change: '+0.3 from last semester' },
    { name: 'Research Papers', value: '45', trend: 'up', change: '+12 this year' },
    { name: 'Placement Rate', value: '92%', trend: 'up', change: '+5% from last batch' },
    { name: 'Faculty Rating', value: '4.6/5', trend: 'up', change: '+0.2 this semester' }
  ];

  const academicMetrics = [
    { category: 'Student Performance', metric: 'Average CGPA', value: '8.45', trend: 'up' },
    { category: 'Faculty Performance', metric: 'Teaching Rating', value: '4.6/5', trend: 'up' },
    { category: 'Research Output', metric: 'Publications', value: '45', trend: 'up' },
    { category: 'Placements', metric: 'Placement Rate', value: '92%', trend: 'up' },
    { category: 'Projects', metric: 'Ongoing Projects', value: '28', trend: 'down' }
  ];

  return (
    <GlobalStyle>
      <DashboardContainer>
        <Sidebar>
          <MenuList>
            <MenuItem>
              <MenuButton
                active={activeSection === 'overview'}
                onClick={() => navigate('/hod-dashboard')}
              >
                <GroupsIcon /> Overview
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'faculty'}
                onClick={() => navigate('/faculty-management')}
              >
                <PeopleIcon /> Faculty
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'students'}
                onClick={() => navigate('/student-management')}
              >
                <SchoolIcon /> Students
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'performance'}
                onClick={() => navigate('/department-performance')}
              >
                <AssessmentIcon /> Performance
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'notifications'}
                onClick={() => navigate('/hod-notifications')}
              >
                <NotificationsIcon /> Notifications
              </MenuButton>
            </MenuItem>
            <LogoutButton onClick={handleLogout}>
              <LogoutIcon /> Logout
            </LogoutButton>
          </MenuList>
        </Sidebar>

        <MainContent>
          <Header>
            <Title>
              <h1>
                <AssessmentIcon />
                Department Performance
              </h1>
            </Title>
          </Header>

          <StatsGrid>
            {overallMetrics.map((metric, index) => (
              <StatCard 
                key={index}
                iconColor={
                  index === 0 ? '#3498db' :
                  index === 1 ? '#2ecc71' :
                  index === 2 ? '#f39c12' :
                  '#e74c3c'
                }
                trendUp={metric.trend === 'up'}
              >
                <h3>
                  {index === 0 ? <BarChartIcon /> :
                   index === 1 ? <LibraryBooksIcon /> :
                   index === 2 ? <WorkIcon /> :
                   <StarIcon />}
                  {metric.name}
                </h3>
                <p>{metric.value}</p>
                <div className="trend">
                  {metric.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  {metric.change}
                </div>
              </StatCard>
            ))}
          </StatsGrid>

          <PerformanceSection>
            <h2>
              <TimelineIcon />
              Academic Performance Metrics
            </h2>
            <MetricsTable>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {academicMetrics.map((metric, index) => (
                  <tr key={index}>
                    <td>{metric.category}</td>
                    <td>{metric.metric}</td>
                    <td>{metric.value}</td>
                    <td>
                      <div className={metric.trend === 'up' ? 'trend-up' : 'trend-down'}>
                        {metric.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        {metric.trend === 'up' ? 'Improving' : 'Declining'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </MetricsTable>
          </PerformanceSection>

          <PerformanceGrid>
            <PerformanceCard bgColor="#e8f5e9" textColor="#2e7d32">
              <h3>Student Achievement</h3>
              <div className="stat">85%</div>
              <div className="description">Students scoring above 8.0 CGPA</div>
            </PerformanceCard>
            <PerformanceCard bgColor="#e3f2fd" textColor="#1976d2">
              <h3>Faculty Research</h3>
              <div className="stat">45</div>
              <div className="description">Research papers published this year</div>
            </PerformanceCard>
            <PerformanceCard bgColor="#fff3e0" textColor="#f57c00">
              <h3>Placement Success</h3>
              <div className="stat">92%</div>
              <div className="description">Students placed in top companies</div>
            </PerformanceCard>
          </PerformanceGrid>
        </MainContent>
      </DashboardContainer>
    </GlobalStyle>
  );
};

export default DepartmentPerformance; 