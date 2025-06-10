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
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NotificationCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: ${props => props.unread ? '#f8f9fe' : 'white'};
  border: 1px solid #eee;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.type) {
      case 'warning':
        return '#fff3e0';
      case 'info':
        return '#e3f2fd';
      case 'assignment':
        return '#e8f5e9';
      case 'event':
        return '#f3e5f5';
      default:
        return '#f5f5f5';
    }
  }};

  svg {
    color: ${props => {
      switch (props.type) {
        case 'warning':
          return '#f57c00';
        case 'info':
          return '#1976d2';
        case 'assignment':
          return '#43a047';
        case 'event':
          return '#8e24aa';
        default:
          return '#666';
      }
    }};
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 16px;
`;

const NotificationTime = styled.span`
  color: #666;
  font-size: 12px;
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const FilterTab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#f5f5f5'};
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #333;
  }
`;

const DialogContent = styled.div`
  margin-bottom: 24px;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const DialogButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  ${props => props.primary ? `
    background: #1a73e8;
    color: white;
    &:hover {
      background: #1557b0;
    }
  ` : `
    background: #f5f5f5;
    color: #666;
    &:hover {
      background: #e4e4e4;
    }
  `}
`;

const DetailRow = styled.div`
  margin-bottom: 16px;

  h4 {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
    font-weight: 500;
  }

  p {
    margin: 0;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const FacultyNotifications = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Mock notifications data with detailed information
  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Submissions',
      message: '5 students have submitted their Data Structures assignment',
      time: '10 minutes ago',
      unread: true,
      details: {
        course: 'Data Structures',
        submissionCount: '5 out of 45 students',
        submissionTime: 'March 28, 2024 - 2:30 PM',
        submittedBy: [
          'John Doe (Roll: CS101)',
          'Jane Smith (Roll: CS102)',
          'Mike Johnson (Roll: CS103)',
          'Sarah Williams (Roll: CS104)',
          'Robert Brown (Roll: CS105)'
        ],
        deadline: 'March 30, 2024',
        assignmentTitle: 'Implementation of AVL Trees',
        totalMarks: '50',
        status: 'Pending Review'
      }
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: '3 students in CSE-4A have attendance below 75%',
      time: '1 hour ago',
      unread: true,
      details: {
        class: 'CSE-4A',
        subject: 'Data Structures',
        period: 'January - March 2024',
        affectedStudents: [
          {
            name: 'Alex Thompson',
            rollNo: 'CS201',
            attendance: '68%',
            absences: '12 classes'
          },
          {
            name: 'Emily Clark',
            rollNo: 'CS205',
            attendance: '72%',
            absences: '10 classes'
          },
          {
            name: 'David Wilson',
            rollNo: 'CS208',
            attendance: '70%',
            absences: '11 classes'
          }
        ],
        requiredAttendance: '75%',
        actionRequired: 'Send notification to students and their parents',
        deadline: 'Take action by April 5, 2024'
      }
    },
    {
      id: 3,
      type: 'event',
      title: 'Department Meeting',
      message: 'Monthly department meeting scheduled for tomorrow at 10 AM',
      time: '2 hours ago',
      unread: false,
      details: {
        date: 'March 29, 2024',
        time: '10:00 AM - 12:00 PM',
        venue: 'Conference Room A',
        agenda: [
          'Review of academic progress',
          'Discussion of upcoming examinations',
          'Department activities planning',
          'Student performance analysis',
          'Any other matters'
        ],
        requiredAttendees: 'All faculty members',
        documents: 'Please bring the monthly progress report',
        coordinator: 'Dr. James Anderson',
        notes: 'Attendance is mandatory. Please be punctual.'
      }
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'New features added to the faculty portal',
      time: '1 day ago',
      unread: false,
      details: {
        updateType: 'System Enhancement',
        releaseDate: 'March 27, 2024',
        newFeatures: [
          'Enhanced attendance tracking system',
          'Improved assignment grading interface',
          'New student performance analytics dashboard',
          'Integrated communication system with students'
        ],
        affectedModules: [
          'Attendance Management',
          'Assignment Management',
          'Student Performance Tracking'
        ],
        trainingSession: 'Available online through faculty portal',
        support: 'Contact IT helpdesk for assistance',
        documentation: 'Updated user guide available in the help section'
      }
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    // Mark as read logic here
  };

  const closeDialog = () => {
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      case 'assignment':
        return <AssignmentTurnedInIcon />;
      case 'event':
        return <EventIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'unread' && notification.unread) ||
                         (activeFilter === notification.type);
    return matchesSearch && matchesFilter;
  });

  const renderNotificationDetails = (details) => {
    if (Array.isArray(details)) {
      return (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {details.map((item, index) => (
            <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
          ))}
        </ul>
      );
    }
    return details;
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <DashboardIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-students')}>
          <GroupIcon /> Students
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
        <Header>
          <Title>Notifications</Title>
          <SearchContainer>
            <SearchBar>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <FilterButton>
              <FilterListIcon /> Filter
            </FilterButton>
          </SearchContainer>
        </Header>

        <FilterTabs>
          <FilterTab 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            All
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'unread'} 
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'assignment'} 
            onClick={() => setActiveFilter('assignment')}
          >
            Assignments
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'warning'} 
            onClick={() => setActiveFilter('warning')}
          >
            Alerts
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'event'} 
            onClick={() => setActiveFilter('event')}
          >
            Events
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'info'} 
            onClick={() => setActiveFilter('info')}
          >
            Updates
          </FilterTab>
        </FilterTabs>

        <NotificationList>
          {filteredNotifications.map(notification => (
            <NotificationCard 
              key={notification.id} 
              unread={notification.unread}
              onClick={() => handleNotificationClick(notification)}
            >
              <IconContainer type={notification.type}>
                {getNotificationIcon(notification.type)}
              </IconContainer>
              <NotificationContent>
                <NotificationHeader>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationHeader>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationActions>
                  {notification.unread && (
                    <ActionButton>
                      <CheckCircleIcon /> Mark as Read
                    </ActionButton>
                  )}
                  <ActionButton>
                    <DeleteIcon /> Delete
                  </ActionButton>
                  <ActionButton>
                    <MoreVertIcon /> More
                  </ActionButton>
                </NotificationActions>
              </NotificationContent>
            </NotificationCard>
          ))}
        </NotificationList>

        {selectedNotification && (
          <>
            <DialogOverlay onClick={closeDialog} />
            <Dialog>
              <DialogHeader>
                <h2>{selectedNotification.title}</h2>
                <IconButton onClick={closeDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogHeader>
              <DialogContent>
                {Object.entries(selectedNotification.details).map(([key, value]) => (
                  <DetailRow key={key}>
                    <h4>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                    <p>{renderNotificationDetails(value)}</p>
                  </DetailRow>
                ))}
              </DialogContent>
              <DialogFooter>
                <DialogButton onClick={closeDialog}>Close</DialogButton>
                {selectedNotification.type === 'assignment' && (
                  <DialogButton primary onClick={() => navigate('/faculty-assignments')}>
                    View Submissions
                  </DialogButton>
                )}
                {selectedNotification.type === 'warning' && (
                  <DialogButton primary onClick={() => navigate('/faculty-attendance')}>
                    View Attendance
                  </DialogButton>
                )}
                {selectedNotification.type === 'event' && (
                  <DialogButton primary onClick={() => navigate('/calendar')}>
                    Add to Calendar
                  </DialogButton>
                )}
              </DialogFooter>
            </Dialog>
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default FacultyNotifications; 