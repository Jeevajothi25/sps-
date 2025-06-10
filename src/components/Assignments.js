import React, { useState } from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

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

const AssignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const AssignmentCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SubjectName = styled.h3`
  color: #1a73e8;
  margin: 0 0 10px 0;
`;

const AssignmentTitle = styled.h4`
  color: #333;
  margin: 0 0 15px 0;
`;

const DueDate = styled.p`
  color: ${props => props.overdue ? '#f44336' : '#666'};
  margin: 0 0 15px 0;
  font-size: 0.9em;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.submitted ? '#4CAF50' : '#ff9800'};
  font-weight: 500;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: ${props => props.primary ? '#1a73e8' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.primary ? '#1557b0' : '#e4e4e4'};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#1a73e8' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#e4e4e4'};
  }
`;

const Assignments = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [filter, setFilter] = useState('all');

  const assignments = [
    {
      subject: 'Database Management Systems',
      title: 'ER Diagram Assignment',
      dueDate: '2024-03-25',
      submitted: true,
      submissionDate: '2024-03-20'
    },
    {
      subject: 'Computer Networks',
      title: 'Network Protocols Implementation',
      dueDate: '2024-03-28',
      submitted: false
    },
    {
      subject: 'Operating Systems',
      title: 'Process Scheduling Simulation',
      dueDate: '2024-03-30',
      submitted: false
    },
    {
      subject: 'Web Technologies',
      title: 'React Components Development',
      dueDate: '2024-03-22',
      submitted: true,
      submissionDate: '2024-03-21'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'submitted') return assignment.submitted;
    if (filter === 'pending') return !assignment.submitted;
    return true;
  });

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !assignments.submitted;
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
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Title>Assignments</Title>

        <FilterSection>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </FilterButton>
          <FilterButton 
            active={filter === 'submitted'} 
            onClick={() => setFilter('submitted')}
          >
            Submitted
          </FilterButton>
        </FilterSection>

        <AssignmentGrid>
          {filteredAssignments.map((assignment, index) => (
            <AssignmentCard key={index}>
              <SubjectName>{assignment.subject}</SubjectName>
              <AssignmentTitle>{assignment.title}</AssignmentTitle>
              <DueDate overdue={isOverdue(assignment.dueDate)}>
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </DueDate>
              <Status submitted={assignment.submitted}>
                {assignment.submitted ? (
                  <>
                    <CheckCircleIcon /> Submitted
                  </>
                ) : (
                  <>
                    <PendingIcon /> Pending
                  </>
                )}
              </Status>
              {assignment.submitted && (
                <div style={{ color: '#666', fontSize: '0.9em' }}>
                  Submitted on: {new Date(assignment.submissionDate).toLocaleDateString()}
                </div>
              )}
              <ButtonGroup>
                <Button>
                  <DownloadIcon /> Download
                </Button>
                {!assignment.submitted && (
                  <Button primary>
                    <UploadIcon /> Submit
                  </Button>
                )}
              </ButtonGroup>
            </AssignmentCard>
          ))}
        </AssignmentGrid>
      </MainContent>
    </Container>
  );
};

export default Assignments; 