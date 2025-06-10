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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import BlockIcon from '@mui/icons-material/Block';

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

const AttendanceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.background || 'white'};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
  }
`;

const SubjectList = styled.div`
  margin-top: 30px;
`;

const SubjectCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SubjectInfo = styled.div`
  flex: 1;
`;

const SubjectName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
`;

const SubjectCode = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const AttendancePercentage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: ${props => {
    if (props.percentage >= 85) return '#4CAF50';
    if (props.percentage >= 75) return '#ff9800';
    return '#f44336';
  }};
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fe;
  border-radius: 10px;
`;

const MonthButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#1a73e8' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#f1f1f1'};
  }
`;

const AttendanceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #eee;
  color: #666;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  background: ${props => {
    switch (props.status) {
      case 'present': return '#e8f5e9';
      case 'absent': return '#ffebee';
      case 'onduty': return '#fff3e0';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'present': return '#4CAF50';
      case 'absent': return '#f44336';
      case 'onduty': return '#ff9800';
      default: return '#666';
    }
  }};
`;

const EligibilitySection = styled.div`
  background: ${props => props.isEligible ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  border: 1px solid ${props => props.isEligible ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'};
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;

  .icon {
    font-size: 2.5rem;
    color: ${props => props.isEligible ? '#4CAF50' : '#f44336'};
  }

  .content {
    flex: 1;

    h4 {
      margin: 0 0 5px 0;
      color: ${props => props.isEligible ? '#2e7d32' : '#d32f2f'};
      font-size: 1.1rem;
    }

    p {
      margin: 0;
      color: ${props => props.isEligible ? '#1b5e20' : '#c62828'};
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
`;

const SubjectEligibilityList = styled.div`
  margin-top: 20px;
`;

const SubjectEligibilityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .subject-info {
    display: flex;
    align-items: center;
    gap: 10px;

    h4 {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }

    .code {
      color: #666;
      font-size: 0.9rem;
    }
  }

  .eligibility-info {
    display: flex;
    align-items: center;
    gap: 15px;

    .percentage {
      font-weight: 600;
      color: ${props => {
        const value = props.percentage;
        if (value >= 75) return '#4CAF50';
        if (value >= 65) return '#ff9800';
        return '#f44336';
      }};
    }

    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      background: ${props => {
        const value = props.percentage;
        if (value >= 75) return 'rgba(76, 175, 80, 0.1)';
        if (value >= 65) return 'rgba(255, 152, 0, 0.1)';
        return 'rgba(244, 67, 54, 0.1)';
      }};
      color: ${props => {
        const value = props.percentage;
        if (value >= 75) return '#2e7d32';
        if (value >= 65) return '#e65100';
        return '#c62828';
      }};
    }
  }
`;

const Attendance = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState('March');

  const attendanceData = {
    overallPercentage: 92,
    totalClasses: 450,
    attendedClasses: 414,
    subjects: [
      {
        code: 'CS3301',
        name: 'Database Management Systems',
        percentage: 94,
        classes: [
          { date: '2024-03-01', status: 'present' },
          { date: '2024-03-04', status: 'present' },
          { date: '2024-03-05', status: 'onduty' },
          { date: '2024-03-07', status: 'present' },
          { date: '2024-03-08', status: 'present' }
        ]
      },
      {
        code: 'CS3302',
        name: 'Computer Networks',
        percentage: 90,
        classes: [
          { date: '2024-03-01', status: 'present' },
          { date: '2024-03-04', status: 'absent' },
          { date: '2024-03-05', status: 'present' },
          { date: '2024-03-07', status: 'present' },
          { date: '2024-03-08', status: 'present' }
        ]
      },
      {
        code: 'CS3303',
        name: 'Operating Systems',
        percentage: 88,
        classes: [
          { date: '2024-03-01', status: 'present' },
          { date: '2024-03-04', status: 'present' },
          { date: '2024-03-05', status: 'present' },
          { date: '2024-03-07', status: 'absent' },
          { date: '2024-03-08', status: 'present' }
        ]
      },
      {
        code: 'CS3304',
        name: 'Software Engineering',
        percentage: 92,
        classes: [
          { date: '2024-03-01', status: 'present' },
          { date: '2024-03-04', status: 'present' },
          { date: '2024-03-05', status: 'present' },
          { date: '2024-03-07', status: 'present' },
          { date: '2024-03-08', status: 'onduty' }
        ]
      },
      {
        code: 'CS3305',
        name: 'Web Technologies',
        percentage: 95,
        classes: [
          { date: '2024-03-01', status: 'present' },
          { date: '2024-03-04', status: 'present' },
          { date: '2024-03-05', status: 'present' },
          { date: '2024-03-07', status: 'present' },
          { date: '2024-03-08', status: 'present' }
        ]
      }
    ]
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon fontSize="small" />;
      case 'absent':
        return <CancelIcon fontSize="small" />;
      case 'onduty':
        return <WarningIcon fontSize="small" />;
      default:
        return null;
    }
  };

  // Calculate exam eligibility
  const calculateEligibility = () => {
    const eligibleSubjects = attendanceData.subjects.filter(subject => 
      subject.percentage >= 75
    ).length;
    const isEligible = eligibleSubjects === attendanceData.subjects.length;

    return {
      eligibleSubjects,
      totalSubjects: attendanceData.subjects.length,
      isEligible
    };
  };

  const eligibilityStatus = calculateEligibility();

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/student-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem active>
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
        <Title>Attendance Overview</Title>

        <AttendanceStats>
          <StatCard background="#e8f5e9" color="#4CAF50">
            <h3>Overall Attendance</h3>
            <p>{attendanceData.overallPercentage}%</p>
          </StatCard>
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3>Total Classes</h3>
            <p>{attendanceData.totalClasses}</p>
          </StatCard>
          <StatCard background="#fff3e0" color="#ff9800">
            <h3>Classes Attended</h3>
            <p>{attendanceData.attendedClasses}</p>
          </StatCard>
          <StatCard 
            background={eligibilityStatus.isEligible ? '#e8f5e9' : '#ffebee'}
            color={eligibilityStatus.isEligible ? '#4CAF50' : '#f44336'}
          >
            <h3>Exam Eligibility</h3>
            <p>{eligibilityStatus.eligibleSubjects}/{eligibilityStatus.totalSubjects}</p>
          </StatCard>
        </AttendanceStats>

        <EligibilitySection isEligible={eligibilityStatus.isEligible}>
          <div className="icon">
            {eligibilityStatus.isEligible ? <HowToRegIcon /> : <BlockIcon />}
          </div>
          <div className="content">
            <h4>
              {eligibilityStatus.isEligible 
                ? 'You are eligible for semester examinations' 
                : 'Attendance criteria not met for some subjects'}
            </h4>
            <p>
              {eligibilityStatus.isEligible 
                ? 'Your attendance meets the minimum requirement of 75% in all subjects.' 
                : 'Please improve your attendance in subjects marked in red to become eligible.'}
            </p>
          </div>
        </EligibilitySection>

        <MonthSelector>
          <CalendarTodayIcon />
          {['January', 'February', 'March', 'April'].map(month => (
            <MonthButton
              key={month}
              active={selectedMonth === month}
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </MonthButton>
          ))}
        </MonthSelector>

        <SubjectList>
          {attendanceData.subjects.map((subject, index) => (
            <SubjectCard key={index}>
              <SubjectInfo>
                <SubjectName>{subject.name}</SubjectName>
                <SubjectCode>{subject.code}</SubjectCode>
              </SubjectInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <AttendancePercentage percentage={subject.percentage}>
                  {subject.percentage}%
                </AttendancePercentage>
                <span className="status" style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  background: subject.percentage >= 75 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  color: subject.percentage >= 75 ? '#2e7d32' : '#c62828'
                }}>
                  {subject.percentage >= 75 ? 'Eligible' : 'Not Eligible'}
                </span>
              </div>
            </SubjectCard>
          ))}
        </SubjectList>

        <AttendanceTable>
          <thead>
            <tr>
              <Th>Date</Th>
              <Th>Subject</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.subjects.flatMap(subject =>
              subject.classes.map((classDay, index) => (
                <tr key={`${subject.code}-${index}`}>
                  <Td>{new Date(classDay.date).toLocaleDateString()}</Td>
                  <Td>{subject.name}</Td>
                  <Td>
                    <StatusBadge status={classDay.status}>
                      {getStatusIcon(classDay.status)}
                      {classDay.status.charAt(0).toUpperCase() + classDay.status.slice(1)}
                    </StatusBadge>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </AttendanceTable>
      </MainContent>
    </Container>
  );
};

export default Attendance; 