import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  
  input {
    flex: 1;
    padding: 12px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
`;

const StudentImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const StudentInfo = styled.div`
  h3 {
    margin: 0 0 5px 0;
    color: #333;
  }

  p {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const AttendanceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 15px;
  padding: 8px;
  border-radius: 5px;
  background: ${props => props.low ? '#fff5f5' : '#f0fff4'};
  color: ${props => props.low ? '#f44336' : '#4CAF50'};
  font-weight: 500;
`;

const StudentsList = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const students = [
    {
      id: '23CSE001',
      name: 'John Smith',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      attendance: '92%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'john.smith@email.com'
    },
    {
      id: '23CSE002',
      name: 'Emma Wilson',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      attendance: '88%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'emma.wilson@email.com'
    },
    {
      id: '23CSE003',
      name: 'Michael Brown',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      attendance: '72%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'michael.brown@email.com'
    },
    {
      id: '23CSE004',
      name: 'Sophia Davis',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      attendance: '95%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'sophia.davis@email.com'
    },
    {
      id: '23CSE005',
      name: 'James Johnson',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      attendance: '68%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'james.johnson@email.com'
    },
    {
      id: '23CSE006',
      name: 'Olivia Taylor',
      class: 'II CSE A',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      attendance: '91%',
      subjects: ['Data Structures', 'DBMS', 'Web Development'],
      contact: 'olivia.taylor@email.com'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem active>
          <PeopleIcon /> Students
        </NavItem>
        <NavItem>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem>
          <EventNoteIcon /> Attendance
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
          <ProfileImage src="https://th.bing.com/th/id/OIP.yoybF28YEteSu9J-spETQQHaLG?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Faculty" />
          <ProfileInfo>
            <Name>Dr. Sarah Johnson</Name>
            <SubInfo>Professor - Computer Science Department</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <SearchBar>
          <SearchIcon style={{ color: '#666' }} />
          <input
            type="text"
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton>
            <FilterListIcon />
            Filter
          </FilterButton>
        </SearchBar>

        <StudentGrid>
          {filteredStudents.map((student) => (
            <StudentCard key={student.id}>
              <StudentImage src={student.image} alt={student.name} />
              <StudentInfo>
                <h3>{student.name}</h3>
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Class:</strong> {student.class}</p>
                <p><strong>Contact:</strong> {student.contact}</p>
                <AttendanceStatus low={parseFloat(student.attendance) < 75}>
                  {parseFloat(student.attendance) < 75 ? (
                    <>
                      <WarningIcon style={{ fontSize: 20 }} />
                      Low Attendance: {student.attendance}
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon style={{ fontSize: 20 }} />
                      Good Attendance: {student.attendance}
                    </>
                  )}
                </AttendanceStatus>
              </StudentInfo>
            </StudentCard>
          ))}
        </StudentGrid>
      </MainContent>
    </Container>
  );
};

export default StudentsList; 