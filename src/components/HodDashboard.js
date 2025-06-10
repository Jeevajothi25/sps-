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
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
  font-family: 'Poppins', sans-serif;

  svg {
    color: #3498db;
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
  font-family: 'Poppins', sans-serif;

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
`;

const ScheduleCard = styled(Card)`
  .schedule-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: ${props => props.active ? '#f0f7ff' : '#f8f9fa'};
  border-left: 4px solid ${props => props.active ? '#3498db' : 'transparent'};
  transition: all 0.3s ease;

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
      font-family: 'Poppins', sans-serif;
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

const AchievementCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${props => props.iconBg || '#e3f2fd'};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${props => props.iconColor || '#3498db'};
      font-size: 1.5rem;
    }
  }

  .content {
    flex: 1;

    h4 {
      margin: 0;
      color: #2c3e50;
      font-family: 'Poppins', sans-serif;
    }

    p {
      margin: 0.25rem 0 0 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  }
`;

const HodDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock data for department overview
  const departmentStats = [
    { name: 'Total Faculty', count: 45, trend: 'up', change: '+3 this year' },
    { name: 'Total Students', count: 450, trend: 'up', change: '+50 from last batch' },
    { name: 'Research Papers', count: 28, trend: 'up', change: '+8 this semester' },
    { name: 'Ongoing Projects', count: 12, trend: 'up', change: '+3 new projects' }
  ];

  // Mock data for faculty performance
  const facultyPerformance = [
    { name: 'Outstanding', count: 15, percentage: '33%', trend: 'up' },
    { name: 'Good Performance', count: 25, percentage: '56%', trend: 'up' },
    { name: 'Need Improvement', count: 5, percentage: '11%', trend: 'down' }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      time: '10:00 AM',
      title: 'Department Meeting',
      location: 'Conference Hall A',
      active: true
    },
    {
      time: '2:00 PM',
      title: 'Research Presentation',
      location: 'Seminar Hall',
      active: false
    },
    {
      time: '4:00 PM',
      title: 'Industry Collaboration Meet',
      location: 'Board Room',
      active: false
    }
  ];

  // Mock data for department achievements
  const achievements = [
    {
      icon: <EmojiEventsIcon />,
      title: 'Best Department Award',
      description: 'Recognized for academic excellence',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32'
    },
    {
      icon: <StarIcon />,
      title: 'Research Grant Approved',
      description: '₹50 Lakhs for AI Research Lab',
      iconBg: '#fff3e0',
      iconColor: '#f57c00'
    },
    {
      icon: <SchoolIcon />,
      title: 'Placement Success',
      description: '95% placement rate achieved',
      iconBg: '#e3f2fd',
      iconColor: '#1976d2'
    }
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
              <AccountBalanceIcon />
              Welcome, Dr. {user?.name}
            </Title>
            <div style={{ color: '#666', fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>
              <strong>Head of Department</strong> | Computer Science Engineering
            </div>
          </Header>

          <StatsGrid>
            {departmentStats.map((stat, index) => (
              <StatCard 
                key={index}
                iconColor={
                  index === 0 ? '#3498db' :
                  index === 1 ? '#2ecc71' :
                  index === 2 ? '#f39c12' :
                  '#e74c3c'
                }
                trendUp={stat.trend === 'up'}
              >
                <h3>
                  {index === 0 ? <PeopleIcon /> :
                   index === 1 ? <SchoolIcon /> :
                   index === 2 ? <AssessmentIcon /> :
                   <TimelineIcon />}
                  {stat.name}
                </h3>
                <p>{stat.count}</p>
                <div className="trend">
                  {stat.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                  {stat.change}
                </div>
              </StatCard>
            ))}
          </StatsGrid>

          <Grid>
            <Card>
              <SectionTitle>
                <AssessmentIcon /> Faculty Performance
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
                  {facultyPerformance.map((item, index) => (
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
              {upcomingEvents.map((event, index) => (
                <ScheduleItem key={index} active={event.active}>
                  <div className="time">
                    <AccessTimeIcon />
                    {event.time}
                  </div>
                  <div className="details">
                    <h4>{event.title}</h4>
                    <p>
                      <LocationOnIcon />
                      {event.location}
                    </p>
                  </div>
                </ScheduleItem>
              ))}
            </ScheduleCard>
          </Grid>

          <Grid>
            {achievements.map((achievement, index) => (
              <AchievementCard 
                key={index}
                iconBg={achievement.iconBg}
                iconColor={achievement.iconColor}
              >
                <div className="icon">
                  {achievement.icon}
                </div>
                <div className="content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              </AchievementCard>
            ))}
          </Grid>
        </MainContent>
      </DashboardContainer>
    </GlobalStyle>
  );
};

export default HodDashboard; 