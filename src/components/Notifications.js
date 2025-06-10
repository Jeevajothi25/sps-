import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
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

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#1a73e8' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#e4e4e4'};
  }
`;

const NotificationCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.2s;
  cursor: pointer;
  display: flex;
  gap: 15px;
  align-items: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  ${props => !props.read && `
    border-left: 4px solid #1a73e8;
  `}
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.type) {
      case 'assignment':
        return '#e3f2fd';
      case 'exam':
        return '#fff3e0';
      case 'announcement':
        return '#f3e5f5';
      case 'warning':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'assignment':
        return '#1a73e8';
      case 'exam':
        return '#ff9800';
      case 'announcement':
        return '#9c27b0';
      case 'warning':
        return '#f44336';
      default:
        return '#666';
    }
  }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
`;

const NotificationMessage = styled.p`
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

const NotificationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  background: ${props => {
    switch (props.type) {
      case 'urgent':
        return '#ffebee';
      case 'important':
        return '#fff3e0';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'urgent':
        return '#f44336';
      case 'important':
        return '#ff9800';
      default:
        return '#666';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;

  svg {
    font-size: 48px;
    color: #ccc;
    margin-bottom: 20px;
  }

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
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

const Notifications = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'A new assignment for Advanced Mathematics has been posted. Due date: April 15, 2024',
      timestamp: '2024-03-28T10:30:00',
      read: false,
      priority: 'important',
      details: {
        course: 'Advanced Mathematics',
        dueDate: 'April 15, 2024',
        instructor: 'Dr. Sarah Johnson',
        requirements: 'Complete all problems from Chapter 5, sections 5.1-5.4. Show all work and submit as a PDF.',
        additionalNotes: 'This assignment will count for 20% of your final grade. Make sure to review the lecture notes from last week before starting.'
      }
    },
    {
      id: 2,
      type: 'exam',
      title: 'Upcoming Arrear Exam',
      message: 'Your arrear exam for Programming in C is scheduled for April 15, 2024. Please complete the registration process.',
      timestamp: '2024-03-27T15:45:00',
      read: false,
      priority: 'urgent',
      details: {
        course: 'Programming in C',
        examDate: 'April 15, 2024',
        venue: 'Main Hall, Block A',
        duration: '3 hours',
        syllabus: 'Units 1-5 covering basic C programming concepts, arrays, pointers, structures, and file handling',
        requirements: 'Bring your hall ticket, ID card, and necessary stationery. No electronic devices allowed.',
        registrationDeadline: 'April 5, 2024'
      }
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Holiday Announcement',
      message: 'The college will remain closed on April 1, 2024 due to annual day celebrations.',
      timestamp: '2024-03-26T09:15:00',
      read: true,
      details: {
        date: 'April 1, 2024',
        event: 'Annual Day Celebrations',
        venue: 'College Auditorium',
        schedule: '9:00 AM - 4:00 PM',
        activities: 'Cultural performances, prize distribution, and special guest lectures',
        contact: 'For queries, contact the Student Affairs Office'
      }
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Attendance Warning',
      message: 'Your attendance in Data Structures is below 75%. Please maintain regular attendance to meet the requirements.',
      timestamp: '2024-03-25T14:20:00',
      read: true,
      priority: 'urgent',
      details: {
        course: 'Data Structures',
        currentAttendance: '72%',
        requiredAttendance: '75%',
        classes: 'You have missed 8 out of 32 classes',
        recommendation: 'Attend all remaining classes to meet the minimum attendance requirement',
        consequence: 'Failure to meet attendance requirements may result in detention from final examinations',
        contact: 'Please meet your class advisor for guidance'
      }
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
  };

  const closeDialog = () => {
    setSelectedNotification(null);
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'assignments':
        return notifications.filter(n => n.type === 'assignment');
      case 'exams':
        return notifications.filter(n => n.type === 'exam');
      case 'announcements':
        return notifications.filter(n => n.type === 'announcement');
      case 'warnings':
        return notifications.filter(n => n.type === 'warning');
      default:
        return notifications;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <AssignmentTurnedInIcon />;
      case 'exam':
        return <EventAvailableIcon />;
      case 'announcement':
        return <AnnouncementIcon />;
      case 'warning':
        return <WarningIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/student-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/arrear-management')}>
          <AssignmentLateIcon /> Arrear management
        </NavItem>
        <NavItem active>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Title>Notifications</Title>

        <FilterContainer>
          <FilterButton
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            <NotificationsIcon /> All
          </FilterButton>
          <FilterButton
            active={activeFilter === 'unread'}
            onClick={() => setActiveFilter('unread')}
          >
            <ErrorIcon /> Unread
          </FilterButton>
          <FilterButton
            active={activeFilter === 'assignments'}
            onClick={() => setActiveFilter('assignments')}
          >
            <AssignmentTurnedInIcon /> Assignments
          </FilterButton>
          <FilterButton
            active={activeFilter === 'exams'}
            onClick={() => setActiveFilter('exams')}
          >
            <EventAvailableIcon /> Exams
          </FilterButton>
          <FilterButton
            active={activeFilter === 'announcements'}
            onClick={() => setActiveFilter('announcements')}
          >
            <AnnouncementIcon /> Announcements
          </FilterButton>
          <FilterButton
            active={activeFilter === 'warnings'}
            onClick={() => setActiveFilter('warnings')}
          >
            <WarningIcon /> Warnings
          </FilterButton>
        </FilterContainer>

        {getFilteredNotifications().length > 0 ? (
          getFilteredNotifications().map(notification => (
            <NotificationCard
              key={notification.id}
              read={notification.read}
              onClick={() => handleNotificationClick(notification)}
            >
              <IconContainer type={notification.type}>
                {getNotificationIcon(notification.type)}
              </IconContainer>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationMeta>
                  <span>{formatDate(notification.timestamp)}</span>
                  <div>
                    {notification.priority && (
                      <Badge type={notification.priority}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </Badge>
                    )}
                  </div>
                </NotificationMeta>
              </NotificationContent>
            </NotificationCard>
          ))
        ) : (
          <EmptyState>
            <CheckCircleIcon />
            <h3>No notifications found</h3>
            <p>You're all caught up!</p>
          </EmptyState>
        )}

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
                    <p>{value}</p>
                  </DetailRow>
                ))}
              </DialogContent>
              <DialogFooter>
                <DialogButton onClick={closeDialog}>Close</DialogButton>
                {selectedNotification.type === 'assignment' && (
                  <DialogButton primary onClick={() => navigate('/assignments')}>
                    View Assignment
                  </DialogButton>
                )}
                {selectedNotification.type === 'exam' && (
                  <DialogButton primary onClick={() => navigate('/arrear-management')}>
                    Register for Exam
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

export default Notifications; 