import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

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

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #3498db;
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

    svg {
      color: ${props => props.iconColor || '#3498db'};
    }
  }
  
  p {
    color: #2c3e50;
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #3498db;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
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
`;

const ScheduleCard = styled(Card)`
  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.active ? '#f0f7ff' : '#f8f9fa'};
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }

  .time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #3498db;
    font-weight: 500;
    min-width: 150px;
  }

  .details {
    flex: 1;
    margin-left: 1rem;

    h4 {
      margin: 0;
      color: #2c3e50;
    }

    p {
      margin: 0.25rem 0 0 0;
      color: #7f8c8d;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

const TopperCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;

  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const TopperList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopperItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${props => props.rank === 1 ? '#fff8e1' : props.rank === 2 ? '#f3e5f5' : '#e3f2fd'};
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const TopperRank = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.rank === 1 ? '#ffd700' : props.rank === 2 ? '#c0c0c0' : '#cd7f32'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const TopperInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0.25rem 0 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const TopperStats = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-weight: 600;

  svg {
    color: #f1c40f;
    font-size: 1.2rem;
  }
`;

const ClassInchargeDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  // Sample data for class toppers
  const toppers = [
    { id: 1, name: "John Doe", rollNo: "20CS101", cgpa: 9.8, department: "Computer Science" },
    { id: 2, name: "Jane Smith", rollNo: "20CS102", cgpa: 9.6, department: "Computer Science" },
    { id: 3, name: "Mike Johnson", rollNo: "20CS103", cgpa: 9.5, department: "Computer Science" }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock data for today's schedule
  const todaySchedule = [
    {
      time: '9:00 AM',
      subject: 'Data Structures',
      room: 'Room 301',
      active: true
    },
    {
      time: '11:00 AM',
      subject: 'Database Management',
      room: 'Room 302',
      active: false
    },
    {
      time: '2:00 PM',
      subject: 'Computer Networks',
      room: 'Lab 201',
      active: false
    }
  ];

  // Mock data for student performance
  const studentPerformance = [
    { name: 'High Performers', count: 15, percentage: '33%', trend: 'up' },
    { name: 'Average Performers', count: 25, percentage: '56%', trend: 'up' },
    { name: 'Need Improvement', count: 5, percentage: '11%', trend: 'down' }
  ];

  return (
    <GlobalStyle>
      <DashboardContainer>
        <Sidebar>
          <MenuList>
            <MenuItem>
              <MenuButton
                active={activeSection === 'overview'}
                onClick={() => setActiveSection('overview')}
              >
                <GroupsIcon /> Overview
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'attendance'}
                onClick={() => navigate('/attendance-management')}
              >
                <EventNoteIcon /> Attendance
              </MenuButton>
            </MenuItem>
            
            <MenuItem>
              <MenuButton
                active={activeSection === 'performance'}
                onClick={() => navigate('/performance-management')}
              >
                <AssessmentIcon /> Performance
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'toppers'}
                onClick={() => setActiveSection('toppers')}
              >
                <EmojiEventsIcon /> Class Toppers
              </MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton
                active={activeSection === 'notifications'}
                onClick={() => navigate('/class-incharge-notifications')}
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
              <GroupsIcon />
              Welcome, {user.name}
            </Title>
            <div style={{ color: '#666', fontSize: '1rem' }}>
              <strong>{user.class}</strong> | {user.department} Department
            </div>
          </Header>

          <StatsGrid>
            <StatCard iconColor="#3498db">
              <h3><PeopleIcon /> Total Students</h3>
              <p>45</p>
              <div className="trend">
                <TrendingUpIcon /> +2 from last semester
              </div>
            </StatCard>
            <StatCard iconColor="#2ecc71">
              <h3><CheckCircleIcon /> Average Attendance</h3>
              <p>85%</p>
              <div className="trend">
                <TrendingUpIcon /> +5% this month
              </div>
            </StatCard>
            <StatCard iconColor="#e74c3c">
              <h3><WarningIcon /> Low Attendance</h3>
              <p>5</p>
              <div className="trend" style={{ color: '#e74c3c' }}>
                <TrendingDownIcon /> Critical cases
              </div>
            </StatCard>
            <StatCard iconColor="#f39c12">
              <h3><AssignmentIcon /> Pending Tasks</h3>
              <p>8</p>
              <div className="trend">
                <AssignmentIcon /> Due this week
              </div>
            </StatCard>
          </StatsGrid>

          <Grid>
            <Card>
              <SectionTitle>
                <AssessmentIcon /> Student Performance
              </SectionTitle>
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPerformance.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>{item.percentage}</td>
                      <td style={{ color: item.trend === 'up' ? '#2ecc71' : '#e74c3c' }}>
                        {item.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>

            <ScheduleCard>
              <SectionTitle>
                <CalendarTodayIcon /> Today's Schedule
              </SectionTitle>
              {todaySchedule.map((item, index) => (
                <ScheduleItem key={index} active={item.active}>
                  <div className="time">
                    <AccessTimeIcon />
                    {item.time}
                  </div>
                  <div className="details">
                    <h4>{item.subject}</h4>
                    <p>
                      <LocationOnIcon />
                      {item.room}
                    </p>
                  </div>
                </ScheduleItem>
              ))}
            </ScheduleCard>
          </Grid>

          <Grid>
            <Card>
              <SectionTitle>
                <SchoolIcon /> Academic Progress
              </SectionTitle>
              <Table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Pass %</th>
                    <th>Avg. Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data Structures</td>
                    <td>92%</td>
                    <td>78.5</td>
                    <td style={{ color: '#2ecc71' }}>
                      <CheckCircleIcon /> Good
                    </td>
                  </tr>
                  <tr>
                    <td>Database Management</td>
                    <td>88%</td>
                    <td>75.2</td>
                    <td style={{ color: '#2ecc71' }}>
                      <CheckCircleIcon /> Good
                    </td>
                  </tr>
                  <tr>
                    <td>Computer Networks</td>
                    <td>75%</td>
                    <td>68.4</td>
                    <td style={{ color: '#f39c12' }}>
                      <WarningIcon /> Needs Attention
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Grid>

          {activeSection === 'toppers' && (
            <>
              <Header>
                <Title>
                  <EmojiEventsIcon /> Class Toppers
                </Title>
              </Header>

              <Grid>
                <TopperCard>
                  <h3>
                    <StarIcon style={{ color: '#f1c40f' }} /> Top Performers
                  </h3>
                  <TopperList>
                    {toppers.map((topper, index) => (
                      <TopperItem key={topper.id} rank={index + 1}>
                        <TopperRank rank={index + 1}>{index + 1}</TopperRank>
                        <TopperInfo>
                          <h4>{topper.name}</h4>
                          <p>{topper.rollNo} • {topper.department}</p>
                        </TopperInfo>
                        <TopperStats>
                          <StarIcon />
                          {topper.cgpa}
                        </TopperStats>
                      </TopperItem>
                    ))}
                  </TopperList>
                </TopperCard>

                <TopperCard>
                  <h3>
                    <AssessmentIcon style={{ color: '#3498db' }} /> Performance Analysis
                  </h3>
                  {/* Add performance charts or additional analysis here */}
                </TopperCard>
              </Grid>
            </>
          )}
        </MainContent>
      </DashboardContainer>
    </GlobalStyle>
  );
};

export default ClassInchargeDashboard; 