import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import GradeIcon from '@mui/icons-material/Grade';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClassIcon from '@mui/icons-material/Class';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../context/AuthContext';

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

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background: #3498db;
    color: white;

    &:hover {
      background: #2980b9;
    }
  }

  &.secondary {
    background: #f0f7ff;
    color: #3498db;

    &:hover {
      background: #e3f2fd;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    margin-left: 0.5rem;

    &::placeholder {
      color: #95a5a6;
    }
  }

  svg {
    color: #95a5a6;
  }
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .more {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f0f7ff;
      }
    }
  }

  .profile {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
    }

    .info {
      h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.1rem;
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
  }

  .details {
    display: grid;
    gap: 1rem;

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #7f8c8d;
      font-size: 0.9rem;

      svg {
        color: #3498db;
      }

      &.performance {
        padding: 0.5rem;
        border-radius: 8px;
        background: ${props => {
          if (props.performance >= 9) return '#e8f5e9';
          if (props.performance >= 8) return '#f0f7ff';
          if (props.performance >= 7) return '#fff3e0';
          return '#ffebee';
        }};
        color: ${props => {
          if (props.performance >= 9) return '#2e7d32';
          if (props.performance >= 8) return '#1976d2';
          if (props.performance >= 7) return '#f57c00';
          return '#c62828';
        }};
      }
    }
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      transition: all 0.3s ease;

      &.edit {
        background: #f0f7ff;
        color: #3498db;

        &:hover {
          background: #e3f2fd;
        }
      }

      &.delete {
        background: #fff5f5;
        color: #e74c3c;

        &:hover {
          background: #fee2e2;
        }
      }
    }
  }
`;

const StudentManagement = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('students');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddStudent = () => {
    navigate('/add-student');
  };

  // Mock student data
  const studentData = [
    {
      id: 1,
      name: 'John Smith',
      rollNumber: 'CS2023001',
      year: '3rd Year',
      section: 'A',
      cgpa: 9.2,
      attendance: '95%',
      email: 'john.smith@university.edu',
      phone: '+91 98765 43210',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      rollNumber: 'CS2023002',
      year: '3rd Year',
      section: 'A',
      cgpa: 8.8,
      attendance: '92%',
      email: 'emma.wilson@university.edu',
      phone: '+91 98765 43211',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      name: 'James Brown',
      rollNumber: 'CS2023003',
      year: '3rd Year',
      section: 'B',
      cgpa: 7.9,
      attendance: '88%',
      email: 'james.brown@university.edu',
      phone: '+91 98765 43212',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 4,
      name: 'Sophia Chen',
      rollNumber: 'CS2023004',
      year: '3rd Year',
      section: 'B',
      cgpa: 9.5,
      attendance: '98%',
      email: 'sophia.chen@university.edu',
      phone: '+91 98765 43213',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <SchoolIcon />
                Student Management
              </h1>
            </Title>
            <ActionButtons>
              <Button className="secondary">
                <FilterListIcon /> Filter
              </Button>
              <Button className="primary" onClick={handleAddStudent}>
                <AddIcon /> Add Student
              </Button>
            </ActionButtons>
          </Header>

          <SearchBar>
            <SearchInput>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search students by name, roll number, year, or section..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchInput>
          </SearchBar>

          <StudentGrid>
            {filteredStudents.map(student => (
              <StudentCard key={student.id} performance={student.cgpa}>
                <div className="header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <GradeIcon style={{ color: '#f1c40f' }} />
                    <span style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>CGPA: {student.cgpa}</span>
                  </div>
                  <div className="more">
                    <MoreVertIcon style={{ color: '#95a5a6' }} />
                  </div>
                </div>
                <div className="profile">
                  <img src={student.image} alt={student.name} />
                  <div className="info">
                    <h3>{student.name}</h3>
                    <p>
                      <SchoolIcon style={{ fontSize: '0.9rem' }} />
                      {student.rollNumber}
                    </p>
                  </div>
                </div>
                <div className="details">
                  <div className="detail-item">
                    <ClassIcon />
                    {student.year} - Section {student.section}
                  </div>
                  <div className="detail-item">
                    <MailIcon />
                    {student.email}
                  </div>
                  <div className="detail-item">
                    <PhoneIcon />
                    {student.phone}
                  </div>
                  <div className="detail-item">
                    <CalendarTodayIcon />
                    Attendance: {student.attendance}
                  </div>
                  <div className={`detail-item performance`}>
                    <AssessmentIcon />
                    Performance: {
                      student.cgpa >= 9 ? 'Excellent' :
                      student.cgpa >= 8 ? 'Very Good' :
                      student.cgpa >= 7 ? 'Good' :
                      'Needs Improvement'
                    }
                  </div>
                </div>
                <div className="actions">
                  <button className="edit">
                    <EditIcon /> Edit
                  </button>
                  <button className="delete">
                    <DeleteIcon /> Delete
                  </button>
                </div>
              </StudentCard>
            ))}
          </StudentGrid>
        </MainContent>
      </DashboardContainer>
    </GlobalStyle>
  );
};

export default StudentManagement; 