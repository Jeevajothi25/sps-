import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
  font-family: 'Poppins', sans-serif;
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

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
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
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.95rem;
  letter-spacing: 0.3px;

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

const ActionBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: #2c3e50;
    font-family: 'Poppins', sans-serif;

    &::placeholder {
      color: #95a5a6;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? '#3498db' : 'white'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  border-left: 4px solid ${props => props.unread ? '#3498db' : 'transparent'};

  &:hover {
    transform: translateX(5px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;
      font-weight: ${props => props.unread ? '600' : '500'};

      .status {
        color: ${props => props.unread ? '#3498db' : '#95a5a6'};
        font-size: 0.75rem;
      }
    }

    .date {
      color: #95a5a6;
      font-size: 0.9rem;
    }
  }

  .content {
    color: #2c3e50;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;

    button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;

      &.mark-read {
        background: #f0f7ff;
        color: #3498db;

        &:hover {
          background: #3498db;
          color: white;
        }
      }

      &.delete {
        background: #fff5f5;
        color: #e74c3c;

        &:hover {
          background: #e74c3c;
          color: white;
        }
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

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

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      color: #3498db;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: #e74c3c;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #2c3e50;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #2c3e50;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #95a5a6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #2c3e50;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const PDFPreviewModal = styled(Modal)``;

const PDFContent = styled.div`
  background: white;
  padding: 40px;
  width: 21cm;
  min-height: 29.7cm;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
`;

const PDFHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #3498db;
`;

const CollegeLogo = styled.div`
  text-align: center;

  h1 {
    color: #2c3e50;
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
  }

  p {
    color: #7f8c8d;
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }
`;

const DocumentInfo = styled.div`
  text-align: right;

  h2 {
    color: #3498db;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    color: #7f8c8d;
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
  }
`;

const NotificationSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #3498db;
  }
`;

const NotificationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8fafc;
    color: #2c3e50;
    font-weight: 600;
  }

  td {
    color: #2c3e50;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: ${props => 
    props.type === 'alert' ? '#fff3f3' :
    props.type === 'info' ? '#f0f7ff' :
    props.type === 'reminder' ? '#fff8e1' : '#f0fff4'};
  color: ${props => 
    props.type === 'alert' ? '#e74c3c' :
    props.type === 'info' ? '#3498db' :
    props.type === 'reminder' ? '#f39c12' : '#2ecc71'};

  svg {
    font-size: 1rem;
  }
`;

const PDFFooter = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #3498db;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;

  p {
    margin: 0.25rem 0;
  }
`;

const ClassInchargeNotifications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    type: 'alert',
    content: '',
    targetDate: ''
  });
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const pdfContentRef = useRef(null);

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      title: "Low Attendance Alert",
      content: "5 students have attendance below 75% in Data Structures course. Immediate attention required.",
      date: "2024-03-20",
      unread: true,
      type: "alert"
    },
    {
      id: 2,
      title: "Assignment Submission Update",
      content: "85% of students have submitted the Database Management assignment before the deadline.",
      date: "2024-03-19",
      unread: true,
      type: "info"
    },
    {
      id: 3,
      title: "Performance Report Generated",
      content: "Monthly performance report for March 2024 is now available for review.",
      date: "2024-03-18",
      unread: false,
      type: "info"
    },
    {
      id: 4,
      title: "Department Meeting Reminder",
      content: "Reminder: Department meeting scheduled for tomorrow at 2:00 PM in Conference Room A.",
      date: "2024-03-17",
      unread: false,
      type: "reminder"
    }
  ];

  const handleCreateNotification = (e) => {
    e.preventDefault();
    // Here you would typically send the notification data to your backend
    console.log('Creating notification:', notificationForm);
    
    // Add the new notification to the list (in a real app, this would come from the backend)
    const newNotification = {
      id: notifications.length + 1,
      title: notificationForm.title,
      content: notificationForm.content,
      date: notificationForm.targetDate || new Date().toISOString().split('T')[0],
      unread: true,
      type: notificationForm.type
    };

    // Reset form and close modal
    setNotificationForm({
      title: '',
      type: 'alert',
      content: '',
      targetDate: ''
    });
    setShowCreateModal(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      case 'reminder':
        return <NotificationsActiveIcon />;
      case 'event':
        return <EventIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const handleDownloadPDF = async () => {
    const content = pdfContentRef.current;
    const canvas = await html2canvas(content, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('notifications-report.pdf');
    setShowPDFPreview(false);
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/class-incharge-dashboard')}>
          <GroupsIcon /> Overview
        </NavItem>
        <NavItem onClick={() => navigate('/attendance-management')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        
        <NavItem onClick={() => navigate('/performance-management')}>
          <AssessmentIcon /> Performance
        </NavItem>
        <NavItem onClick={() => navigate('/class-toppers')}>
          <EmojiEventsIcon /> Class Toppers
        </NavItem>
        <NavItem active>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/')}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <NotificationsIcon />
            Notifications
          </Title>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => setShowPDFPreview(true)}>
              <PictureAsPdfIcon /> Generate Report
            </Button>
            <Button primary onClick={() => setShowCreateModal(true)}>
              <AddIcon /> Create Notification
            </Button>
          </div>
        </Header>

        <ActionBar>
          <SearchBar>
            <SearchIcon style={{ color: '#95a5a6' }} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Button>
            <FilterListIcon /> Filter
          </Button>
          <Button>
            <MarkEmailReadIcon /> Mark All Read
          </Button>
        </ActionBar>

        <NotificationList>
          {notifications.map(notification => (
            <NotificationCard key={notification.id} unread={notification.unread}>
              <div className="header">
                <div className="title">
                  <CircleIcon style={{ fontSize: '0.75rem' }} className="status" />
                  {notification.title}
                </div>
                <div className="date">{notification.date}</div>
              </div>
              <div className="content">{notification.content}</div>
              <div className="actions">
                {notification.unread && (
                  <button className="mark-read">
                    <MarkEmailReadIcon /> Mark as Read
                  </button>
                )}
                <button className="delete">
                  <DeleteIcon /> Delete
                </button>
              </div>
            </NotificationCard>
          ))}
        </NotificationList>

        {/* PDF Preview Modal */}
        {showPDFPreview && (
          <PDFPreviewModal>
            <ModalContent style={{ width: '800px', maxWidth: '95%' }}>
              <ModalHeader>
                <h2>
                  <PictureAsPdfIcon /> Notifications Report
                </h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button primary onClick={handleDownloadPDF}>
                    <DownloadIcon /> Download PDF
                  </Button>
                  <CloseButton onClick={() => setShowPDFPreview(false)}>
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                  </CloseButton>
                </div>
              </ModalHeader>

              <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '70vh' }}>
                <PDFContent ref={pdfContentRef}>
                  <PDFHeader>
                    <CollegeLogo>
                      <h1>ABC Engineering College</h1>
                      <p>Department of Computer Science</p>
                    </CollegeLogo>
                    <DocumentInfo>
                      <h2>Notifications Report</h2>
                      <p>Generated on: {new Date().toLocaleDateString()}</p>
                      <p>Academic Year: 2023-2024</p>
                    </DocumentInfo>
                  </PDFHeader>

                  <NotificationSection>
                    <SectionTitle>
                      <NotificationsIcon /> Recent Notifications
                    </SectionTitle>
                    <NotificationTable>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map(notification => (
                          <tr key={notification.id}>
                            <td>
                              <StatusBadge type={notification.type}>
                                {getNotificationIcon(notification.type)}
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </StatusBadge>
                            </td>
                            <td>{notification.title}</td>
                            <td>{notification.content}</td>
                            <td>{notification.date}</td>
                            <td>
                              <StatusBadge type={notification.unread ? 'alert' : 'info'}>
                                {notification.unread ? 'Unread' : 'Read'}
                              </StatusBadge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </NotificationTable>
                  </NotificationSection>

                  <NotificationSection>
                    <SectionTitle>
                      <AssessmentIcon /> Summary
                    </SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Total Notifications</h4>
                        <p style={{ margin: 0, fontSize: '1.5rem', color: '#3498db', fontWeight: '600' }}>
                          {notifications.length}
                        </p>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Unread</h4>
                        <p style={{ margin: 0, fontSize: '1.5rem', color: '#e74c3c', fontWeight: '600' }}>
                          {notifications.filter(n => n.unread).length}
                        </p>
                      </div>
                      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>Read</h4>
                        <p style={{ margin: 0, fontSize: '1.5rem', color: '#2ecc71', fontWeight: '600' }}>
                          {notifications.filter(n => !n.unread).length}
                        </p>
                      </div>
                    </div>
                  </NotificationSection>

                  <PDFFooter>
                    <p>This is an automatically generated report from the Student Management System</p>
                    <p>© 2024 ABC Engineering College. All rights reserved.</p>
                  </PDFFooter>
                </PDFContent>
              </div>
            </ModalContent>
          </PDFPreviewModal>
        )}

        {showCreateModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <h2>
                  <AddIcon /> Create Notification
                </h2>
                <CloseButton onClick={() => setShowCreateModal(false)}>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                  </svg>
                </CloseButton>
              </ModalHeader>
              
              <Form onSubmit={handleCreateNotification}>
                <FormGroup>
                  <label>Title</label>
                  <Input
                    type="text"
                    placeholder="Enter notification title"
                    value={notificationForm.title}
                    onChange={(e) => setNotificationForm({
                      ...notificationForm,
                      title: e.target.value
                    })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Type</label>
                  <Select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({
                      ...notificationForm,
                      type: e.target.value
                    })}
                    required
                  >
                    <option value="alert">Alert</option>
                    <option value="info">Information</option>
                    <option value="reminder">Reminder</option>
                    <option value="event">Event</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <label>Content</label>
                  <TextArea
                    placeholder="Enter notification content"
                    value={notificationForm.content}
                    onChange={(e) => setNotificationForm({
                      ...notificationForm,
                      content: e.target.value
                    })}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Target Date (Optional)</label>
                  <Input
                    type="date"
                    value={notificationForm.targetDate}
                    onChange={(e) => setNotificationForm({
                      ...notificationForm,
                      targetDate: e.target.value
                    })}
                  />
                </FormGroup>

                <ButtonGroup>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button primary type="submit">
                    Create Notification
                  </Button>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </Container>
  );
};

export default ClassInchargeNotifications; 