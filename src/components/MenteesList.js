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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 400px;
  position: relative;

  input {
    width: 100%;
    padding: 12px 40px 12px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }

  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const MenteeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const MenteeCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MenteeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const MenteeImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MenteeInfo = styled.div`
  flex: 1;
`;

const MenteeName = styled.h3`
  margin: 0;
  color: #333;
`;

const MenteeId = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

const MenteeStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 15px 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 10px;
  background: ${props => props.background || '#f8f9fe'};
  border-radius: 8px;
  color: ${props => props.color || '#333'};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
`;

const ContactInfo = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;
  color: #666;
  font-size: 0.9rem;

  svg {
    color: #1a73e8;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.9rem;

  ${props => props.primary && `
    background: #1a73e8;
    color: white;

    &:hover {
      background: #1557b0;
    }
  `}

  ${props => props.secondary && `
    background: #f8f9fe;
    color: #666;

    &:hover {
      background: #edf2fd;
    }
  `}
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.color};
  font-size: 0.9rem;
  margin-top: 10px;
`;

const MenteesList = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mentees = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "20CS101",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      attendance: 85,
      cgpa: 8.5,
      performance: "Good",
      status: "On Track",
      email: "john.doe@example.com",
      phone: "+91 98765 43210",
      address: "123 College Street, Chennai",
      department: "Computer Science"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "20CS102",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      attendance: 65,
      cgpa: 6.8,
      performance: "Needs Improvement",
      status: "At Risk",
      email: "jane.smith@example.com",
      phone: "+91 98765 43211",
      address: "456 Campus Road, Chennai",
      department: "Computer Science"
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "20CS103",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      attendance: 92,
      cgpa: 9.2,
      performance: "Excellent",
      status: "On Track",
      email: "mike.johnson@example.com",
      phone: "+91 98765 43212",
      address: "789 University Ave, Chennai",
      department: "Computer Science"
    },
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "20CS104",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      attendance: 78,
      cgpa: 7.9,
      performance: "Good",
      status: "On Track",
      email: "sarah.williams@example.com",
      phone: "+91 98765 43213",
      address: "321 College Road, Chennai",
      department: "Computer Science"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "On Track":
        return "#4CAF50";
      case "At Risk":
        return "#f44336";
      default:
        return "#666";
    }
  };

  const getPerformanceIcon = (performance) => {
    switch(performance) {
      case "Excellent":
        return <TrendingUpIcon style={{ color: '#4CAF50' }} />;
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

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/mentor-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem active>
          <GroupIcon /> Mentees
        </NavItem>
        <NavItem>
          <AssessmentIcon /> Progress Reports
        </NavItem>
        <NavItem>
          <ChatIcon /> Messages
        </NavItem>
        <NavItem>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ProfileCard>
          <ProfileImage src="https://th.bing.com/th/id/OIP.yoybF28YEteSu9J-spETQQHaLG?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Mentor" />
          <ProfileInfo>
            <Name>Prof. David Wilson</Name>
            <SubInfo>Senior Mentor - Computer Science Department</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <ActionBar>
          <SearchBar>
            <input
              type="text"
              placeholder="Search mentees by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </SearchBar>
          <FilterButton>
            <FilterListIcon /> Filter
          </FilterButton>
        </ActionBar>

        <MenteeGrid>
          {filteredMentees.map(mentee => (
            <MenteeCard key={mentee.id}>
              <MenteeHeader>
                <MenteeImage src={mentee.image} alt={mentee.name} />
                <MenteeInfo>
                  <MenteeName>{mentee.name}</MenteeName>
                  <MenteeId>{mentee.rollNo}</MenteeId>
                </MenteeInfo>
                <Button secondary style={{ padding: '8px', minWidth: 'auto' }}>
                  <MoreVertIcon />
                </Button>
              </MenteeHeader>

              <Status color={getStatusColor(mentee.status)}>
                {mentee.status === "At Risk" ? <WarningIcon /> : <CheckCircleIcon />}
                {mentee.status}
              </Status>

              <MenteeStats>
                <StatItem background="#e8f5e9" color="#2e7d32">
                  <StatValue>{mentee.attendance}%</StatValue>
                  <StatLabel>Attendance</StatLabel>
                </StatItem>
                <StatItem background="#e3f2fd" color="#1565c0">
                  <StatValue>{mentee.cgpa}</StatValue>
                  <StatLabel>CGPA</StatLabel>
                </StatItem>
              </MenteeStats>

              <Status color={getStatusColor(mentee.status)}>
                {getPerformanceIcon(mentee.performance)}
                {mentee.performance}
              </Status>

              <ContactInfo>
                <ContactItem>
                  <EmailIcon />
                  {mentee.email}
                </ContactItem>
                <ContactItem>
                  <PhoneIcon />
                  {mentee.phone}
                </ContactItem>
                <ContactItem>
                  <LocationOnIcon />
                  {mentee.address}
                </ContactItem>
              </ContactInfo>

              <ActionButtons>
                <Button primary>
                  View Details
                </Button>
                <Button secondary>
                  Schedule Meeting
                </Button>
              </ActionButtons>
            </MenteeCard>
          ))}
        </MenteeGrid>
      </MainContent>
    </Container>
  );
};

export default MenteesList; 