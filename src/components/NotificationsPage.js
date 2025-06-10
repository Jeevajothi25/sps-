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
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventIcon from '@mui/icons-material/Event';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary && `
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  `}

  ${props => props.secondary && `
    background: white;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const NotificationList = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f8f9fe;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#e8eeff'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  svg {
    color: ${props => props.iconColor || '#1a73e8'};
    font-size: 24px;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.1rem;
`;

const NotificationMessage = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

const NotificationTime = styled.span`
  color: #999;
  font-size: 0.8rem;
  margin-left: auto;
  padding-left: 20px;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f0f0;
  }

  svg {
    color: #666;
    font-size: 20px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterChip = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.active ? '#1a73e8' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.active ? '#1a73e8' : '#ddd'};

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#f5f5f5'};
  }
`;

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const notifications = [
    {
      id: 1,
      type: 'announcement',
      title: 'Important Announcement',
      message: 'Mid-semester examinations will begin from next week.',
      time: '2 minutes ago',
      icon: <AnnouncementIcon />,
      color: '#fff3e0',
      iconColor: '#f57c00'
    },
    {
      id: 2,
      type: 'assignment',
      title: 'New Assignment Submission',
      message: 'John Doe has submitted the Data Structures assignment.',
      time: '1 hour ago',
      icon: <AssignmentTurnedInIcon />,
      color: '#e8f5e9',
      iconColor: '#2e7d32'
    },
    {
      id: 3,
      type: 'event',
      title: 'Upcoming Event',
      message: 'Technical Symposium registration starts tomorrow.',
      time: '3 hours ago',
      icon: <EventIcon />,
      color: '#e3f2fd',
      iconColor: '#1565c0'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Attendance Update Required',
      message: 'Please update today\'s attendance before 5 PM.',
      time: '5 hours ago',
      icon: <MarkEmailReadIcon />,
      color: '#f3e5f5',
      iconColor: '#6a1b9a'
    }
  ];

  const handleNotificationClick = (notification) => {
    // Handle notification click based on type
    switch(notification.type) {
      case 'assignment':
        navigate('/faculty-assignments');
        break;
      case 'event':
        // Navigate to events page
        break;
      case 'announcement':
        // Show announcement details
        break;
      default:
        break;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter !== 'all' && notification.type !== activeFilter) return false;
    if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-students')}>
          <PeopleIcon /> Students
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem active>
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

        <ActionBar>
          <SearchBar>
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Button primary>
            <AddIcon /> Create Announcement
          </Button>
          <Button secondary>
            <FilterListIcon /> Filter
          </Button>
        </ActionBar>

        <FilterGroup>
          <FilterChip
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All
          </FilterChip>
          <FilterChip
            active={activeFilter === 'announcement'}
            onClick={() => setActiveFilter('announcement')}
          >
            Announcements
          </FilterChip>
          <FilterChip
            active={activeFilter === 'assignment'}
            onClick={() => setActiveFilter('assignment')}
          >
            Assignments
          </FilterChip>
          <FilterChip
            active={activeFilter === 'event'}
            onClick={() => setActiveFilter('event')}
          >
            Events
          </FilterChip>
          <FilterChip
            active={activeFilter === 'reminder'}
            onClick={() => setActiveFilter('reminder')}
          >
            Reminders
          </FilterChip>
        </FilterGroup>

        <NotificationList>
          {filteredNotifications.map(notification => (
            <NotificationItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
            >
              <NotificationIcon color={notification.color} iconColor={notification.iconColor}>
                {notification.icon}
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
              </NotificationContent>
              <NotificationTime>{notification.time}</NotificationTime>
              <NotificationActions>
                <IconButton>
                  <MarkEmailReadIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </NotificationActions>
            </NotificationItem>
          ))}
        </NotificationList>
      </MainContent>
    </Container>
  );
};

export default NotificationsPage; 