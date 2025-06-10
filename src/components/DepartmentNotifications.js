import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const NotificationGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const NotificationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  border-left: 4px solid ${props => {
    switch (props.priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#3498db';
      default: return '#2ecc71';
    }
  }};

  &:hover {
    transform: translateX(5px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .title {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      h3 {
        margin: 0;
        color: #2c3e50;
        font-size: 1.2rem;
        font-family: 'Poppins', sans-serif;
      }

      .priority {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        background: ${props => {
          switch (props.priority) {
            case 'high': return '#fff5f5';
            case 'medium': return '#fff8e1';
            case 'low': return '#e3f2fd';
            default: return '#f0fff4';
          }
        }};
        color: ${props => {
          switch (props.priority) {
            case 'high': return '#e74c3c';
            case 'medium': return '#f39c12';
            case 'low': return '#3498db';
            default: return '#2ecc71';
          }
        }};
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }
  }

  .content {
    color: #7f8c8d;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #95a5a6;
    font-size: 0.9rem;

    .metadata {
      display: flex;
      align-items: center;
      gap: 1rem;

      .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${props => props.read ? '#2ecc71' : '#7f8c8d'};
    }
  }
`;

const DepartmentNotifications = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Department Meeting',
      content: 'Important department meeting scheduled for discussing upcoming semester plans and curriculum updates.',
      priority: 'high',
      date: '2024-03-15',
      time: '10:00 AM',
      read: false,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Research Paper Submissions',
      content: 'Reminder for faculty members to submit their research papers for the upcoming international conference.',
      priority: 'medium',
      date: '2024-03-20',
      time: '11:30 AM',
      read: true,
      type: 'academic'
    },
    {
      id: 3,
      title: 'Student Achievement',
      content: 'Congratulations to our students for winning first place in the National Technical Symposium.',
      priority: 'low',
      date: '2024-03-12',
      time: '09:15 AM',
      read: false,
      type: 'achievement'
    },
    {
      id: 4,
      title: 'Infrastructure Update',
      content: 'New computer lab setup completed. Faculty members can start utilizing the facilities from next week.',
      priority: 'info',
      date: '2024-03-10',
      time: '02:00 PM',
      read: true,
      type: 'facility'
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <ErrorIcon style={{ color: '#e74c3c' }} />;
      case 'medium': return <WarningIcon style={{ color: '#f39c12' }} />;
      case 'low': return <InfoIcon style={{ color: '#3498db' }} />;
      default: return <CheckCircleIcon style={{ color: '#2ecc71' }} />;
    }
  };

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
                <NotificationsIcon />
                Department Notifications
              </h1>
            </Title>
            <ActionButtons>
              <Button className="secondary">
                <FilterListIcon /> Filter
              </Button>
              <Button className="primary">
                <AddIcon /> New Notification
              </Button>
            </ActionButtons>
          </Header>

          <SearchBar>
            <SearchInput>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchInput>
          </SearchBar>

          <NotificationGrid>
            {filteredNotifications.map(notification => (
              <NotificationCard 
                key={notification.id}
                priority={notification.priority}
                read={notification.read}
              >
                <div className="header">
                  <div className="title">
                    {getPriorityIcon(notification.priority)}
                    <h3>{notification.title}</h3>
                    <span className="priority">
                      {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                    </span>
                  </div>
                  <div className="actions">
                    <Button className="secondary">
                      <MarkEmailReadIcon /> Mark as Read
                    </Button>
                    <Button className="secondary" style={{ color: '#e74c3c', background: '#fff5f5' }}>
                      <DeleteIcon /> Delete
                    </Button>
                  </div>
                </div>
                <div className="content">
                  {notification.content}
                </div>
                <div className="footer">
                  <div className="metadata">
                    <div className="item">
                      <EventIcon />
                      {notification.date}
                    </div>
                    <div className="item">
                      <AccessTimeIcon />
                      {notification.time}
                    </div>
                  </div>
                  <div className="status">
                    {notification.read ? (
                      <>
                        <CheckCircleIcon />
                        Read
                      </>
                    ) : (
                      <>
                        <InfoIcon />
                        Unread
                      </>
                    )}
                  </div>
                </div>
              </NotificationCard>
            ))}
          </NotificationGrid>
        </MainContent>
      </DashboardContainer>
    </GlobalStyle>
  );
};

export default DepartmentNotifications; 