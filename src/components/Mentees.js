import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fe;
  padding: 20px;
  gap: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  border-radius: 15px;
  padding: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 20px;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;

  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.background || 'white'};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
  }
`;

const MenteeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const MenteeCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenteeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const MenteeAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e8eeff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
`;

const MenteeInfo = styled.div`
  flex: 1;
`;

const MenteeName = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const MenteeId = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 14px;
`;

const MenteeDetail = styled.p`
  color: #7f8c8d;
  margin: 0.25rem 0;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
  background: ${props => {
    switch (props.status) {
      case 'On Track':
        return '#e8f5e9';
      case 'At Risk':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'On Track':
        return '#2e7d32';
      case 'At Risk':
        return '#c62828';
      default:
        return '#616161';
    }
  }};
`;

const MenteeStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
`;

const StatItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.color}15;
  text-align: center;

  h4 {
    margin: 0;
    color: #666;
    font-size: 12px;
    font-weight: normal;
  }

  p {
    margin: 5px 0 0;
    color: ${props => props.color};
    font-size: 16px;
    font-weight: bold;
  }
`;

const ActionButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #2980b9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Mentees = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const mentees = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "20CS101",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 85,
      cgpa: 8.5,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "20CS102",
      email: "jane.smith@example.com",
      phone: "+91 98765 43211",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 65,
      cgpa: 6.8,
      performance: "Needs Improvement",
      status: "At Risk"
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "20CS103",
      email: "mike.johnson@example.com",
      phone: "+91 98765 43212",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 92,
      cgpa: 9.2,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "20CS104",
      email: "sarah.williams@example.com",
      phone: "+91 98765 43213",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 78,
      cgpa: 7.9,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 5,
      name: "Priya Patel",
      rollNo: "20CS105",
      email: "priya.patel@example.com",
      phone: "+91 98765 43214",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 95,
      cgpa: 9.5,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 6,
      name: "Rahul Kumar",
      rollNo: "20CS106",
      email: "rahul.kumar@example.com",
      phone: "+91 98765 43215",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 72,
      cgpa: 7.2,
      performance: "Needs Improvement",
      status: "At Risk"
    },
    {
      id: 7,
      name: "Emily Chen",
      rollNo: "20CS107",
      email: "emily.chen@example.com",
      phone: "+91 98765 43216",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 88,
      cgpa: 8.8,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 8,
      name: "Alex Thompson",
      rollNo: "20CS108",
      email: "alex.thompson@example.com",
      phone: "+91 98765 43217",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 83,
      cgpa: 8.1,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 9,
      name: "Sneha Reddy",
      rollNo: "20CS109",
      email: "sneha.reddy@example.com",
      phone: "+91 98765 43218",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 68,
      cgpa: 6.5,
      performance: "Needs Improvement",
      status: "At Risk"
    },
    {
      id: 10,
      name: "David Wilson",
      rollNo: "20CS110",
      email: "david.wilson@example.com",
      phone: "+91 98765 43219",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 90,
      cgpa: 8.9,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 11,
      name: "Ananya Sharma",
      rollNo: "20CS111",
      email: "ananya.sharma@example.com",
      phone: "+91 98765 43220",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 86,
      cgpa: 8.3,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 12,
      name: "Mohammed Ali",
      rollNo: "20CS112",
      email: "mohammed.ali@example.com",
      phone: "+91 98765 43221",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 75,
      cgpa: 7.5,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 13,
      name: "Lisa Wang",
      rollNo: "20CS113",
      email: "lisa.wang@example.com",
      phone: "+91 98765 43222",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 93,
      cgpa: 9.3,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 14,
      name: "Raj Malhotra",
      rollNo: "20CS114",
      email: "raj.malhotra@example.com",
      phone: "+91 98765 43223",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 70,
      cgpa: 6.9,
      performance: "Needs Improvement",
      status: "At Risk"
    },
    {
      id: 15,
      name: "Sophie Brown",
      rollNo: "20CS115",
      email: "sophie.brown@example.com",
      phone: "+91 98765 43224",
      department: "Computer Science",
      semester: 4,
      section: "A",
      attendance: 89,
      cgpa: 8.7,
      performance: "Excellent",
      status: "On Track"
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 85) return '#4caf50';
    if (attendance >= 75) return '#ff9800';
    return '#f44336';
  };

  const getCgpaColor = (cgpa) => {
    if (cgpa >= 8.5) return '#4caf50';
    if (cgpa >= 7.0) return '#1a73e8';
    return '#f44336';
  };

  const getPerformanceIcon = (performance) => {
    switch(performance) {
      case "Excellent":
        return <TrendingUpIcon style={{ color: '#4caf50' }} />;
      case "Good":
        return <CheckCircleIcon style={{ color: '#1a73e8' }} />;
      case "Needs Improvement":
        return <TrendingDownIcon style={{ color: '#f44336' }} />;
      default:
        return null;
    }
  };

  const filteredMentees = mentees.filter(mentee =>
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mentees.length,
    onTrack: mentees.filter(m => m.status === "On Track").length,
    atRisk: mentees.filter(m => m.status === "At Risk").length,
    excellent: mentees.filter(m => m.performance === "Excellent").length
  };

  const handleViewProgress = (menteeId) => {
    navigate(`/progress-reports/${menteeId}`);
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/mentor-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem active>
          <GroupIcon /> Mentees
        </NavItem>
        <NavItem onClick={() => navigate('/progress-reports')}>
          <AssessmentIcon /> Progress Reports
        </NavItem>
        <NavItem onClick={() => navigate('/schedule')}>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem onClick={() => navigate('/mentor-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/semester-marks')}>
          <AssessmentIcon /> Semester Marks
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>My Mentees</Title>
          <SearchContainer>
            <SearchBar>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search mentees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <FilterButton>
              <FilterListIcon /> Filter
            </FilterButton>
          </SearchContainer>
        </Header>

        <StatsGrid>
          <StatCard background="#e8f5e9" color="#4caf50">
            <h3><CheckCircleIcon /> On Track</h3>
            <p>{stats.onTrack}</p>
          </StatCard>
          <StatCard background="#ffebee" color="#f44336">
            <h3><WarningIcon /> At Risk</h3>
            <p>{stats.atRisk}</p>
          </StatCard>
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3><TrendingUpIcon /> Excellent Performance</h3>
            <p>{stats.excellent}</p>
          </StatCard>
          <StatCard background="#f3e5f5" color="#9c27b0">
            <h3><GroupIcon /> Total Mentees</h3>
            <p>{stats.total}</p>
          </StatCard>
        </StatsGrid>

        <MenteeGrid>
          {filteredMentees.map(mentee => (
            <MenteeCard key={mentee.id}>
              <MenteeHeader>
                <MenteeAvatar>
                  <PersonIcon />
                </MenteeAvatar>
                <MenteeInfo>
                  <MenteeName>{mentee.name}</MenteeName>
                  <MenteeId>{mentee.rollNo}</MenteeId>
                </MenteeInfo>
                <MoreVertIcon style={{ color: '#666', cursor: 'pointer' }} />
              </MenteeHeader>

              <MenteeDetail>Roll No: {mentee.rollNo}</MenteeDetail>
              <MenteeDetail>Department: {mentee.department}</MenteeDetail>
              <MenteeDetail>Semester: {mentee.semester}</MenteeDetail>
              <MenteeDetail>CGPA: {mentee.cgpa}</MenteeDetail>
              <MenteeDetail>Attendance: {mentee.attendance}%</MenteeDetail>
              <StatusBadge status={mentee.status}>{mentee.status}</StatusBadge>

              <MenteeStats>
                <StatItem color={getAttendanceColor(mentee.attendance)}>
                  <h4>Attendance</h4>
                  <p>{mentee.attendance}%</p>
                </StatItem>
                <StatItem color={getCgpaColor(mentee.cgpa)}>
                  <h4>CGPA</h4>
                  <p>{mentee.cgpa}</p>
                </StatItem>
              </MenteeStats>

              <ButtonGroup>
                <ActionButton onClick={() => handleViewProgress(mentee.id)}>
                  View Progress Report
                </ActionButton>
              </ButtonGroup>
            </MenteeCard>
          ))}
        </MenteeGrid>
      </MainContent>
    </Container>
  );
};

export default Mentees; 