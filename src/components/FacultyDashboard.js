import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fe;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const SubInfo = styled.p`
  margin: 5px 0 0;
  color: #666;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin: 5px 0;
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.active ? '#1a73e8' : '#666'};
  background-color: ${props => props.active ? '#e8eeff' : 'transparent'};

  &:hover {
    background-color: #e8eeff;
    color: #1a73e8;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#1a73e8'};
  }
`;

const ClassesSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: 600;
    color: #333;
  }
`;

const AttendanceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.low ? '#f44336' : '#4CAF50'};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  svg {
    font-size: 24px;
    color: #1a73e8;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const CardContent = styled.div`
  text-align: center;
`;

const StatNumber = styled.h2`
  margin: 0;
  font-size: 36px;
  color: #1a73e8;
`;

const StatText = styled.p`
  margin: 5px 0 0;
  color: #666;
`;

const RecentActivity = styled(Card)`
  grid-column: 1 / -1;
`;

const ActivityList = styled.div`
  margin-top: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fe;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e8eeff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  margin: 0;
  color: #333;
`;

const ActivityTime = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    // Navigate to profile page or open profile modal
    console.log('Profile clicked');
  };

  const handleStudentsClick = () => {
    navigate('/faculty-students');
  };

  const handleAssignmentsClick = () => {
    navigate('/faculty-assignments');
  };

  const handleAttendanceClick = () => {
    navigate('/faculty-attendance');
  };

  const handleNotificationsClick = () => {
    navigate('/faculty-notifications');
  };

  const handleActivityClick = (type) => {
    switch(type) {
      case 'assignment':
        navigate('/faculty-assignments');
        break;
      case 'attendance':
        navigate('/faculty-attendance');
        break;
      case 'student':
        navigate('/students');
        break;
      case 'announcement':
        navigate('/faculty-notifications');
        break;
      default:
        break;
    }
  };

  const classes = [
    {
      class: 'II CSE A',
      subject: 'Data Structures',
      time: '9:00 AM - 10:00 AM',
      attendance: '92%',
      lowAttendance: 2
    },
    {
      class: 'II CSE B',
      subject: 'Data Structures',
      time: '10:00 AM - 11:00 AM',
      attendance: '88%',
      lowAttendance: 3
    },
    {
      class: 'III CSE A',
      subject: 'Database Management',
      time: '11:00 AM - 12:00 PM',
      attendance: '85%',
      lowAttendance: 4
    }
  ];

  return (
    <Container>
      <Sidebar>
        <NavItem active>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={handleStudentsClick}>
          <PeopleIcon /> Students
        </NavItem>
        <NavItem onClick={handleAssignmentsClick}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ProfileCard onClick={handleProfileClick}>
          <ProfileImage src="https://th.bing.com/th/id/OIP.yoybF28YEteSu9J-spETQQHaLG?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Faculty" />
          <ProfileInfo>
            <Name>Dr. Sarah Johnson</Name>
            <SubInfo>Professor - Computer Science Department</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <StatsGrid>
          <StatCard>
            <h3>Total Classes</h3>
            <p>15</p>
          </StatCard>
          <StatCard color="#4CAF50">
            <h3>Average Attendance</h3>
            <p>88.5%</p>
          </StatCard>
          <StatCard color="#f44336">
            <h3>Students with Low Attendance</h3>
            <p>9</p>
          </StatCard>
          <StatCard color="#ff9800">
            <h3>Pending Assignments</h3>
            <p>5</p>
          </StatCard>
        </StatsGrid>

        <ClassesSection>
          <h3>Today's Classes</h3>
          <Table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Attendance</th>
                <th>Low Attendance Students</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item, index) => (
                <tr key={index}>
                  <td>{item.class}</td>
                  <td>{item.subject}</td>
                  <td>{item.time}</td>
                  <td>
                    <AttendanceStatus>
                      <CheckCircleIcon style={{ fontSize: 20 }} />
                      {item.attendance}
                    </AttendanceStatus>
                  </td>
                  <td>
                    <AttendanceStatus low>
                      <WarningIcon style={{ fontSize: 20 }} />
                      {item.lowAttendance} students
                    </AttendanceStatus>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ClassesSection>

        <DashboardGrid>
          <Card onClick={handleStudentsClick}>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
              <PeopleIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>150</StatNumber>
              <StatText>Active Students</StatText>
            </CardContent>
          </Card>

          <Card onClick={handleAssignmentsClick}>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <AssignmentIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>12</StatNumber>
              <StatText>Active Assignments</StatText>
            </CardContent>
          </Card>

          <Card onClick={handleAttendanceClick}>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <EventNoteIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>85%</StatNumber>
              <StatText>Average Attendance</StatText>
            </CardContent>
          </Card>

          <RecentActivity>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <ActivityList>
              <ActivityItem onClick={() => handleActivityClick('assignment')}>
                <ActivityIcon>
                  <AssignmentTurnedInIcon />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityTitle>New Assignment Posted</ActivityTitle>
                  <ActivityTime>2 hours ago</ActivityTime>
                </ActivityInfo>
              </ActivityItem>

              <ActivityItem onClick={() => handleActivityClick('attendance')}>
                <ActivityIcon>
                  <CalendarMonthIcon />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityTitle>Attendance Updated</ActivityTitle>
                  <ActivityTime>3 hours ago</ActivityTime>
                </ActivityInfo>
              </ActivityItem>

              <ActivityItem onClick={() => handleActivityClick('student')}>
                <ActivityIcon>
                  <PersonAddIcon />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityTitle>New Student Enrolled</ActivityTitle>
                  <ActivityTime>5 hours ago</ActivityTime>
                </ActivityInfo>
              </ActivityItem>

              <ActivityItem onClick={() => handleActivityClick('announcement')}>
                <ActivityIcon>
                  <AnnouncementIcon />
                </ActivityIcon>
                <ActivityInfo>
                  <ActivityTitle>New Announcement</ActivityTitle>
                  <ActivityTime>1 day ago</ActivityTime>
                </ActivityInfo>
              </ActivityItem>
            </ActivityList>
          </RecentActivity>
        </DashboardGrid>
      </MainContent>
    </Container>
  );
};

export default FacultyDashboard; 