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
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StudentCard = styled.div`
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

const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

const StudentAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e8eeff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
`;

const StudentId = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const StudentDetails = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 15px;
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

const StudentStats = styled.div`
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

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #1a73e8;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.2s;

  &:hover {
    background: #1557b0;
  }
`;

const FacultyStudents = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: '23CSE001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      department: 'Computer Science',
      semester: 4,
      section: 'A',
      attendance: 85,
      cgpa: 8.5
    },
    {
      id: '23CSE002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 9876543211',
      department: 'Computer Science',
      semester: 4,
      section: 'A',
      attendance: 92,
      cgpa: 9.2
    },
    {
      id: '23CSE003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+91 9876543212',
      department: 'Computer Science',
      semester: 4,
      section: 'A',
      attendance: 78,
      cgpa: 7.8
    },
    {
      id: '23CSE004',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+91 9876543213',
      department: 'Computer Science',
      semester: 4,
      section: 'A',
      attendance: 88,
      cgpa: 8.9
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return '#4caf50';
    if (attendance >= 75) return '#ff9800';
    return '#f44336';
  };

  const getCgpaColor = (cgpa) => {
    if (cgpa >= 9) return '#4caf50';
    if (cgpa >= 7.5) return '#ff9800';
    return '#f44336';
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <DashboardIcon /> Dashboard
        </NavItem>
        <NavItem active>
          <GroupIcon /> Students
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-assignments')}>
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
          <Title>Students</Title>
          <SearchContainer>
            <SearchBar>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search students..."
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
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3><GroupIcon /> Total Students</h3>
            <p>{students.length}</p>
          </StatCard>
          <StatCard background="#e8f5e9" color="#4caf50">
            <h3><CheckCircleIcon /> Good Attendance</h3>
            <p>{students.filter(s => s.attendance >= 75).length}</p>
          </StatCard>
          <StatCard background="#fff3e0" color="#ff9800">
            <h3><AssessmentIcon /> Average CGPA</h3>
            <p>{(students.reduce((acc, s) => acc + s.cgpa, 0) / students.length).toFixed(2)}</p>
          </StatCard>
          <StatCard background="#ffebee" color="#f44336">
            <h3><WarningIcon /> Low Attendance</h3>
            <p>{students.filter(s => s.attendance < 75).length}</p>
          </StatCard>
        </StatsGrid>

        <StudentGrid>
          {filteredStudents.map(student => (
            <StudentCard key={student.id}>
              <StudentHeader>
                <StudentAvatar>
                  <PersonIcon />
                </StudentAvatar>
                <StudentInfo>
                  <StudentName>{student.name}</StudentName>
                  <StudentId>{student.id}</StudentId>
                </StudentInfo>
                <MoreVertIcon style={{ color: '#666', cursor: 'pointer' }} />
              </StudentHeader>

              <StudentDetails>
                <DetailItem>
                  <EmailIcon />
                  {student.email}
                </DetailItem>
                <DetailItem>
                  <PhoneIcon />
                  {student.phone}
                </DetailItem>
                <DetailItem>
                  <SchoolIcon />
                  {student.department} • Semester {student.semester} • Section {student.section}
                </DetailItem>
              </StudentDetails>

              <StudentStats>
                <StatItem color={getAttendanceColor(student.attendance)}>
                  <h4>Attendance</h4>
                  <p>{student.attendance}%</p>
                </StatItem>
                <StatItem color={getCgpaColor(student.cgpa)}>
                  <h4>CGPA</h4>
                  <p>{student.cgpa}</p>
                </StatItem>
              </StudentStats>

              <ActionButton onClick={() => navigate(`/faculty-dashboard/student/${student.id}`)}>
                View Details
              </ActionButton>
            </StudentCard>
          ))}
        </StudentGrid>
      </MainContent>
    </Container>
  );
};

export default FacultyStudents; 