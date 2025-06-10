import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

// Material UI Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
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
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  background: ${props => props.active ? '#f0f7ff' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: #f0f7ff;
    color: #3498db;
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
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
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #3498db;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background: ${props => props.active ? '#2980b9' : '#f8f9fa'};
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${props => props.unread ? '#e74c3c' : '#3498db'};
    font-size: 0.75rem;
  }
`;

const NotificationText = styled.p`
  color: #7f8c8d;
  margin: 0 0 0.5rem 0;
`;

const NotificationTime = styled.span`
  color: #95a5a6;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #95a5a6;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: ${props => props.delete ? '#e74c3c' : '#3498db'};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    min-width: 500px;
  }
`;

const DialogHeader = styled(DialogTitle)`
  background: #1a73e8;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DialogCloseButton = styled(Button)`
  color: white;
  min-width: auto;
  padding: 6px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DetailSection = styled.div`
  margin: 16px 0;
  padding: 16px;
  background: ${props => props.type === 'alert' ? '#fff5f5' : 
    props.type === 'assignment' ? '#f0f7ff' :
    props.type === 'meeting' ? '#f0fff4' :
    props.type === 'message' ? '#fff0f7' : '#f5f6fa'};
  border-radius: 8px;
`;

const DetailHeader = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
`;

const ActionRequired = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  border-radius: 4px;
  
  strong {
    color: #92400e;
  }
`;

const MentorNotifications = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 1,
      title: "Assignment Submission",
      message: "John Doe has submitted the Database Assignment",
      time: "10 minutes ago",
      unread: true,
      type: "assignment",
      details: {
        student: "John Doe",
        subject: "Database Management Systems",
        submissionTime: "March 20, 2024, 10:30 AM",
        status: "On Time",
        action: "Review the submission and provide feedback within 48 hours"
      }
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Upcoming meeting with Jane Smith at 2:00 PM",
      time: "1 hour ago",
      unread: true,
      type: "meeting",
      details: {
        student: "Jane Smith",
        date: "March 21, 2024",
        time: "2:00 PM",
        venue: "Meeting Room 101",
        agenda: "Discuss academic progress and career goals",
        action: "Prepare student's academic record and previous meeting notes"
      }
    },
    {
      id: 3,
      title: "Progress Update",
      message: "Mike Johnson's attendance has dropped below 75%",
      time: "2 hours ago",
      unread: false,
      type: "alert",
      details: {
        student: "Mike Johnson",
        currentAttendance: "72%",
        subjects: ["Data Structures", "Computer Networks"],
        missedClasses: "8 classes in the last month",
        action: "Schedule a counseling session and contact parents if necessary"
      }
    },
    {
      id: 4,
      title: "New Message",
      message: "You have a new message from Sarah Williams",
      time: "3 hours ago",
      unread: false,
      type: "message",
      details: {
        from: "Sarah Williams",
        subject: "Request for Extra Classes",
        message: "I'm finding it difficult to understand certain topics in Programming. Could we arrange extra classes?",
        action: "Respond to the request and coordinate with other students who might need help"
      }
    },
    {
      id: 5,
      title: "System Update",
      message: "New features have been added to the mentor dashboard",
      time: "1 day ago",
      unread: false,
      type: "system",
      details: {
        updateType: "Feature Enhancement",
        changes: [
          "Added new student progress tracking tools",
          "Improved attendance monitoring system",
          "Enhanced communication features"
        ],
        action: "Review new features and update mentoring workflow accordingly"
      }
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const handleClose = () => {
    setSelectedNotification(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon />;
      case 'meeting':
        return <EventNoteIcon />;
      case 'alert':
        return <WarningIcon />;
      case 'message':
        return <MessageIcon />;
      case 'system':
        return <NotificationsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <NavItem onClick={() => navigate('/mentor-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/mentees')}>
          <GroupIcon /> Mentees
        </NavItem>
        <NavItem onclick={() => navigate('/progress-report')}>
          <AssessmentIcon /> Progress Report
        </NavItem>
        
        <NavItem onClick={() => navigate('/schedule')}>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem active>
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
          <Title>
            <NotificationsIcon />
            Notifications
          </Title>
        </Header>

        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'unread'} 
            onClick={() => setFilter('unread')}
          >
            Unread
          </FilterButton>
          <FilterButton 
            active={filter === 'assignment'} 
            onClick={() => setFilter('assignment')}
          >
            Assignments
          </FilterButton>
          <FilterButton 
            active={filter === 'meeting'} 
            onClick={() => setFilter('meeting')}
          >
            Meetings
          </FilterButton>
          <FilterButton 
            active={filter === 'alert'} 
            onClick={() => setFilter('alert')}
          >
            Alerts
          </FilterButton>
        </FilterContainer>

        <NotificationList>
          {filteredNotifications.map(notification => (
            <NotificationCard 
              key={notification.id} 
              onClick={() => setSelectedNotification(notification)}
            >
              <NotificationContent>
                <NotificationTitle unread={notification.unread}>
                  <CircleIcon />
                  {notification.title}
                </NotificationTitle>
                <NotificationText>{notification.message}</NotificationText>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationContent>
              <ActionButtons>
                <ActionButton>
                  <MarkEmailReadIcon />
                </ActionButton>
                <ActionButton delete>
                  <DeleteIcon />
                </ActionButton>
              </ActionButtons>
            </NotificationCard>
          ))}
        </NotificationList>

        <DialogContainer
          open={Boolean(selectedNotification)}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          {selectedNotification && (
            <>
              <DialogHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getNotificationIcon(selectedNotification.type)}
                  {selectedNotification.title}
                </div>
                <DialogCloseButton onClick={handleClose}>
                  <CloseIcon />
                </DialogCloseButton>
              </DialogHeader>
              <DialogContent>
                <DetailSection type={selectedNotification.type}>
                  <DetailHeader>
                    {getNotificationIcon(selectedNotification.type)}
                    Details
                  </DetailHeader>
                  <DetailContent>
                    {selectedNotification.type === 'assignment' && (
                      <>
                        <p><strong>Student:</strong> {selectedNotification.details.student}</p>
                        <p><strong>Subject:</strong> {selectedNotification.details.subject}</p>
                        <p><strong>Submission Time:</strong> {selectedNotification.details.submissionTime}</p>
                        <p><strong>Status:</strong> {selectedNotification.details.status}</p>
                      </>
                    )}
                    {selectedNotification.type === 'meeting' && (
                      <>
                        <p><strong>Student:</strong> {selectedNotification.details.student}</p>
                        <p><strong>Date:</strong> {selectedNotification.details.date}</p>
                        <p><strong>Time:</strong> {selectedNotification.details.time}</p>
                        <p><strong>Venue:</strong> {selectedNotification.details.venue}</p>
                        <p><strong>Agenda:</strong> {selectedNotification.details.agenda}</p>
                      </>
                    )}
                    {selectedNotification.type === 'alert' && (
                      <>
                        <p><strong>Student:</strong> {selectedNotification.details.student}</p>
                        <p><strong>Current Attendance:</strong> {selectedNotification.details.currentAttendance}</p>
                        <p><strong>Affected Subjects:</strong> {selectedNotification.details.subjects.join(', ')}</p>
                        <p><strong>Missed Classes:</strong> {selectedNotification.details.missedClasses}</p>
                      </>
                    )}
                    {selectedNotification.type === 'message' && (
                      <>
                        <p><strong>From:</strong> {selectedNotification.details.from}</p>
                        <p><strong>Subject:</strong> {selectedNotification.details.subject}</p>
                        <p><strong>Message:</strong> {selectedNotification.details.message}</p>
                      </>
                    )}
                    {selectedNotification.type === 'system' && (
                      <>
                        <p><strong>Update Type:</strong> {selectedNotification.details.updateType}</p>
                        <p><strong>Changes:</strong></p>
                        <ul>
                          {selectedNotification.details.changes.map((change, index) => (
                            <li key={index}>{change}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </DetailContent>
                </DetailSection>

                <ActionRequired>
                  <strong>Required Action:</strong>
                  <p>{selectedNotification.details.action}</p>
                </ActionRequired>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </DialogContainer>
      </MainContent>
    </PageContainer>
  );
};

export default MentorNotifications; 