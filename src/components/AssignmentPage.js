import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fe;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
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

const AssignmentTable = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid #eee;
  color: #333;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => {
    if (props.status === 'Submitted') return '#4CAF50';
    if (props.status === 'Not Submitted') return '#ff4444';
    return '#ff9800';
  }};
`;

const AssignmentPage = () => {
  const navigate = useNavigate();
  
  const assignments = [
    {
      subject: 'Math',
      title: 'Algebra Worksheet',
      dueDate: 'Apr 10',
      status: 'Submitted',
      marks: '9',
      remarks: 'Good work'
    },
    {
      subject: 'Physics',
      title: 'Motion Lab Report',
      dueDate: 'Apr 15',
      status: 'Submitted',
      marks: '10',
      remarks: 'Excellent'
    },
    {
      subject: 'Chemistry',
      title: 'Acid-Base Project',
      dueDate: 'Apr 20',
      status: 'Not Submitted',
      marks: '-',
      remarks: 'Pending'
    },
    {
      subject: 'English',
      title: 'Essay on Shakespeare',
      dueDate: 'Apr 25',
      status: 'Submitted',
      marks: '8',
      remarks: 'Well written'
    },
    {
      subject: 'History',
      title: 'Freedom Fighters PPT',
      dueDate: 'Apr 29',
      status: 'Due Soon',
      marks: '-',
      remarks: 'Upcoming'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
        return <CheckCircleIcon style={{ fontSize: 20 }} />;
      case 'Not Submitted':
        return <CancelIcon style={{ fontSize: 20 }} />;
      case 'Due Soon':
        return <AccessTimeIcon style={{ fontSize: 20 }} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem active>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/arrear-management')}>
          <AssignmentLateIcon /> Arrear management
        </NavItem>
        <NavItem onClick={() => navigate('/notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ProfileCard>
          <ProfileImage src="https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg" alt="Student" />
          <ProfileInfo>
            <Name>Riya Sharma</Name>
            <SubInfo>II CSE B  23CSEB01  2023-2027</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <AssignmentTable>
          <Table>
            <thead>
              <tr>
                <Th>Subject</Th>
                <Th>Assignment Title</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
                <Th>Marks</Th>
                <Th>Remarks</Th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <Td>{assignment.subject}</Td>
                  <Td>{assignment.title}</Td>
                  <Td>{assignment.dueDate}</Td>
                  <Td>
                    <Status status={assignment.status}>
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </Status>
                  </Td>
                  <Td>{assignment.marks}</Td>
                  <Td>{assignment.remarks}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AssignmentTable>
      </MainContent>
    </Container>
  );
};

export default AssignmentPage; 