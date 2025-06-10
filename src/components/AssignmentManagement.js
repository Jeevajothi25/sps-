import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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

const AssignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AssignmentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .subject {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .due-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #e74c3c;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${props => props.status === 'completed' ? '#2ecc71' : '#f39c12'};
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;

    button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;

      &.edit {
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

const AssignmentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Data Structures Implementation",
      subject: "Data Structures",
      dueDate: "2024-03-25",
      status: "pending",
      submissionCount: 35,
      totalStudents: 45
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Database Management",
      dueDate: "2024-03-28",
      status: "completed",
      submissionCount: 45,
      totalStudents: 45
    },
    {
      id: 3,
      title: "Network Protocols Analysis",
      subject: "Computer Networks",
      dueDate: "2024-03-30",
      status: "pending",
      submissionCount: 20,
      totalStudents: 45
    },
    {
      id: 4,
      title: "Operating System Concepts",
      subject: "Operating Systems",
      dueDate: "2024-04-02",
      status: "pending",
      submissionCount: 15,
      totalStudents: 45
    }
  ];

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/class-incharge-dashboard')}>
          <GroupsIcon /> Overview
        </NavItem>
        <NavItem onClick={() => navigate('/attendance-management')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem active>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/performance')}>
          <AssessmentIcon /> Performance
        </NavItem>
        <NavItem onClick={() => navigate('/notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/')}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <AssignmentIcon />
            Assignment Management
          </Title>
          <Button primary>
            <AddIcon /> Create Assignment
          </Button>
        </Header>

        <ActionBar>
          <SearchBar>
            <SearchIcon style={{ color: '#95a5a6' }} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Button>
            <FilterListIcon /> Filter
          </Button>
          <Button>
            <DownloadIcon /> Export
          </Button>
        </ActionBar>

        <AssignmentGrid>
          {assignments.map(assignment => (
            <AssignmentCard key={assignment.id} status={assignment.status}>
              <h3>{assignment.title}</h3>
              <div className="subject">{assignment.subject}</div>
              <div className="due-date">
                <CalendarTodayIcon /> Due: {assignment.dueDate}
              </div>
              <div className="status">
                {assignment.status === 'completed' ? (
                  <>
                    <CheckCircleIcon /> Completed
                  </>
                ) : (
                  <>
                    <PendingIcon /> Pending
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#2c3e50' }}>
                Submissions: {assignment.submissionCount}/{assignment.totalStudents}
              </div>
              <div className="actions">
                <button className="edit">
                  <EditIcon /> Edit
                </button>
                <button className="delete">
                  <DeleteIcon /> Delete
                </button>
              </div>
            </AssignmentCard>
          ))}
        </AssignmentGrid>
      </MainContent>
    </Container>
  );
};

export default AssignmentManagement; 