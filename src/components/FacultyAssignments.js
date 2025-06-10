import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingIcon from '@mui/icons-material/Pending';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.primary ? `
    background: #1a73e8;
    color: white;
    border: none;

    &:hover {
      background: #1557b0;
    }
  ` : `
    background: white;
    color: #666;
    border: 1px solid #ddd;

    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;

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

const AssignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const AssignmentCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AssignmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const AssignmentTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
`;

const AssignmentSubject = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const AssignmentDetails = styled.div`
  display: grid;
  gap: 10px;
  margin: 15px 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;

  svg {
    color: #1a73e8;
  }
`;

const AssignmentStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const StatItem = styled.div`
  text-align: center;

  h4 {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 12px;
  }

  p {
    margin: 0;
    color: ${props => props.color || '#333'};
    font-weight: bold;
    font-size: 16px;
  }
`;

const ActionMenu = styled.div`
  display: flex;
  gap: 5px;

  button {
    padding: 5px;
    border: none;
    background: none;
    color: #666;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: #f5f5f5;
    }
  }
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background: ${props => {
    switch (props.status) {
      case 'active':
        return '#e3f2fd';
      case 'pending':
        return '#fff3e0';
      case 'completed':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active':
        return '#1a73e8';
      case 'pending':
        return '#ff9800';
      case 'completed':
        return '#4caf50';
      default:
        return '#666';
    }
  }};
`;

const FacultyAssignments = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const assignments = [
    {
      id: 1,
      title: 'Database Design Project',
      subject: 'Database Management Systems',
      description: 'Design and implement a database system for a hospital management system',
      dueDate: '2024-04-15',
      status: 'active',
      totalStudents: 60,
      submittedCount: 45,
      semester: 4,
      section: 'A'
    },
    {
      id: 2,
      title: 'Sorting Algorithms Implementation',
      subject: 'Data Structures',
      description: 'Implement and compare different sorting algorithms',
      dueDate: '2024-04-10',
      status: 'pending',
      totalStudents: 60,
      submittedCount: 0,
      semester: 4,
      section: 'A'
    },
    {
      id: 3,
      title: 'Network Protocols Analysis',
      subject: 'Computer Networks',
      description: 'Analyze different network protocols and their applications',
      dueDate: '2024-03-25',
      status: 'completed',
      totalStudents: 60,
      submittedCount: 58,
      semester: 4,
      section: 'A'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getSubmissionPercentage = (submitted, total) => {
    return Math.round((submitted / total) * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#1a73e8';
      case 'pending':
        return '#ff9800';
      case 'completed':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <DashboardIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-students')}>
          <GroupIcon /> Students
        </NavItem>
        <NavItem active>
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
        <Header>
          <Title>Assignments</Title>
          <ActionButtons>
            <Button>
              <FilterListIcon /> Filter
            </Button>
            <Button primary>
              <AddIcon /> Create Assignment
            </Button>
          </ActionButtons>
        </Header>

        <SearchContainer>
          <SearchBar>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </SearchContainer>

        <StatsGrid>
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3><AssignmentIcon /> Total Assignments</h3>
            <p>{assignments.length}</p>
          </StatCard>
          <StatCard background="#fff3e0" color="#ff9800">
            <h3><PendingIcon /> Pending Review</h3>
            <p>{assignments.filter(a => a.status === 'active').length}</p>
          </StatCard>
          <StatCard background="#e8f5e9" color="#4caf50">
            <h3><AssignmentTurnedInIcon /> Completed</h3>
            <p>{assignments.filter(a => a.status === 'completed').length}</p>
          </StatCard>
          <StatCard background="#f3e5f5" color="#9c27b0">
            <h3><ClassIcon /> Active Classes</h3>
            <p>4</p>
          </StatCard>
        </StatsGrid>

        <AssignmentGrid>
          {filteredAssignments.map(assignment => (
            <AssignmentCard key={assignment.id}>
              <AssignmentHeader>
                <div>
                  <AssignmentTitle>{assignment.title}</AssignmentTitle>
                  <AssignmentSubject>{assignment.subject}</AssignmentSubject>
                </div>
                <ActionMenu>
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <DeleteIcon />
                  </button>
                </ActionMenu>
              </AssignmentHeader>

              <Badge status={assignment.status}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>

              <AssignmentDetails>
                <DetailItem>
                  <DescriptionIcon />
                  {assignment.description}
                </DetailItem>
                <DetailItem>
                  <CalendarTodayIcon />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </DetailItem>
                <DetailItem>
                  <ClassIcon />
                  Semester {assignment.semester} • Section {assignment.section}
                </DetailItem>
                <DetailItem>
                  <AccessTimeIcon />
                  {new Date(assignment.dueDate) > new Date() ? 
                    `${Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days remaining` :
                    'Deadline passed'}
                </DetailItem>
              </AssignmentDetails>

              <AssignmentStats>
                <StatItem>
                  <h4>Total Students</h4>
                  <p>{assignment.totalStudents}</p>
                </StatItem>
                <StatItem color={getStatusColor(assignment.status)}>
                  <h4>Submitted</h4>
                  <p>{getSubmissionPercentage(assignment.submittedCount, assignment.totalStudents)}%</p>
                </StatItem>
              </AssignmentStats>
            </AssignmentCard>
          ))}
        </AssignmentGrid>
      </MainContent>
    </Container>
  );
};

export default FacultyAssignments; 