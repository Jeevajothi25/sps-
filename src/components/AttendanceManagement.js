import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Container = styled.div`
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
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  background: ${props => props.active ? '#f0f7ff' : 'transparent'};
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: #f0f7ff;
    color: #3498db;
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #3498db;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: #2c3e50;

    &::placeholder {
      color: #95a5a6;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? '#3498db' : 'white'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  svg {
    font-size: 1.25rem;
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
  
  h3 {
    color: #7f8c8d;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #2c3e50;
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: ${props => props.status === 'good' ? '#2ecc71' : '#e74c3c'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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

const AttendanceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.percentage >= 75 ? '#2ecc71' : '#e74c3c'};
  font-weight: 500;
`;

const DateFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  input {
    border: none;
    outline: none;
    padding: 0.25rem;
    color: #2c3e50;
  }
`;

const AttendanceManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data for students' attendance
  const students = [
    {
      id: 1,
      name: "John Doe",
      regNo: "23CSE001",
      totalClasses: 45,
      attended: 40,
      percentage: 88.9,
      lastAbsent: "2024-03-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "23CSE002",
      totalClasses: 45,
      attended: 42,
      percentage: 93.3,
      lastAbsent: "2024-03-10"
    },
    {
      id: 3,
      name: "Mike Johnson",
      regNo: "23CSE003",
      totalClasses: 45,
      attended: 35,
      percentage: 77.8,
      lastAbsent: "2024-03-18"
    },
    {
      id: 4,
      name: "Sarah Williams",
      regNo: "23CSE004",
      totalClasses: 45,
      attended: 38,
      percentage: 84.4,
      lastAbsent: "2024-03-12"
    },
    {
      id: 5,
      name: "Tom Brown",
      regNo: "23CSE005",
      totalClasses: 45,
      attended: 33,
      percentage: 73.3,
      lastAbsent: "2024-03-19"
    }
  ];

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/class-incharge-dashboard')}>
          <GroupsIcon /> Overview
        </NavItem>
        <NavItem active>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/performance-management')}>
          <AssessmentIcon /> Performance
        </NavItem>
        <NavItem onClick={() => navigate('/class-toppers')}>
          <EmojiEventsIcon /> Class Toppers
        </NavItem>
        <NavItem onClick={() => navigate('/class-incharge-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/')}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <CalendarTodayIcon />
            Attendance Management
          </Title>
          <Button primary>
            <DownloadIcon /> Export Report
          </Button>
        </Header>

        <ActionBar>
          <SearchBar>
            <SearchIcon style={{ color: '#95a5a6' }} />
            <input
              type="text"
              placeholder="Search by name or register number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <DateFilter>
            <DateRangeIcon style={{ color: '#95a5a6' }} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </DateFilter>
          <Button>
            <FilterListIcon /> Filter
          </Button>
        </ActionBar>

        <StatsGrid>
          <StatCard status="good">
            <h3><CheckCircleIcon style={{ color: '#2ecc71' }} /> Good Attendance</h3>
            <p>35</p>
            <div className="status">
              <CheckCircleIcon /> Above 75%
            </div>
          </StatCard>
          <StatCard status="warning">
            <h3><WarningIcon style={{ color: '#e74c3c' }} /> Low Attendance</h3>
            <p>5</p>
            <div className="status">
              <WarningIcon /> Below 75%
            </div>
          </StatCard>
          <StatCard>
            <h3><CalendarTodayIcon style={{ color: '#3498db' }} /> Total Classes</h3>
            <p>45</p>
            <div className="status" style={{ color: '#3498db' }}>
              <CalendarTodayIcon /> This Semester
            </div>
          </StatCard>
          <StatCard>
            <h3><GroupsIcon style={{ color: '#f39c12' }} /> Average Attendance</h3>
            <p>85%</p>
            <div className="status" style={{ color: '#f39c12' }}>
              <GroupsIcon /> Class Average
            </div>
          </StatCard>
        </StatsGrid>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>Total Classes</th>
              <th>Classes Attended</th>
              <th>Attendance %</th>
              <th>Last Absent</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.totalClasses}</td>
                <td>{student.attended}</td>
                <td>
                  <AttendanceStatus percentage={student.percentage}>
                    {student.percentage >= 75 ? <CheckCircleIcon /> : <WarningIcon />}
                    {student.percentage.toFixed(1)}%
                  </AttendanceStatus>
                </td>
                <td>{student.lastAbsent}</td>
                <td>
                  <AttendanceStatus percentage={student.percentage}>
                    {student.percentage >= 75 ? 'Good Standing' : 'Needs Attention'}
                  </AttendanceStatus>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>
    </Container>
  );
};

export default AttendanceManagement; 