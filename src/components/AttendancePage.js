import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';

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

const AttendanceOverview = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const OverviewTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const OverviewCard = styled.div`
  text-align: center;
  padding: 20px;
  background: ${props => props.background || '#f8f9fe'};
  border-radius: 8px;
  
  h4 {
    margin: 0 0 10px 0;
    color: #666;
  }
  
  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
  }
`;

const MonthlyAttendance = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
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
  color: ${props => props.present ? '#4CAF50' : '#f44336'};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.value >= 75 ? '#4CAF50' : props.value >= 60 ? '#ff9800' : '#f44336'};
  transition: width 0.3s ease;
`;

const ClassAttendance = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const ClassCard = styled.div`
  background: ${props => {
    const percentage = parseFloat(props.percentage);
    if (percentage >= 75) return '#e8f5e9';
    if (percentage >= 60) return '#fff3e0';
    return '#ffebee';
  }};
  padding: 20px;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => {
      const percentage = parseFloat(props.percentage);
      if (percentage >= 75) return '#4CAF50';
      if (percentage >= 60) return '#ff9800';
      return '#f44336';
    }};
  }
`;

const EligibilitySection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

const EligibilityStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.isEligible ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.isEligible ? '#4CAF50' : '#f44336'};
  margin-top: 10px;
  font-weight: 500;
`;

const SubjectEligibility = styled.div`
  margin-top: 15px;
  
  h4 {
    color: #666;
    margin-bottom: 10px;
  }
`;

const EligibilityBadge = styled.span`
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => props.isEligible ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.isEligible ? '#4CAF50' : '#f44336'};
`;

const EligibilityCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SubjectStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OverallStatusSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatusTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const StatusCard = styled.div`
  background: ${props => props.background || '#f8f9fe'};
  padding: 15px;
  border-radius: 8px;
  
  h4 {
    color: #666;
    margin-bottom: 10px;
    font-size: 14px;
  }
  
  p {
    color: ${props => props.color || '#333'};
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const FinalStatus = styled.div`
  background: ${props => props.isEligible ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.isEligible ? '#4CAF50' : '#f44336'};
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const AttendancePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const attendanceData = [
    {
      date: '2024-03-01',
      subject: 'Mathematics',
      time: '9:00 AM - 10:00 AM',
      present: true,
      teacher: 'Dr. Smith'
    },
    {
      date: '2024-03-01',
      subject: 'Physics',
      time: '10:00 AM - 11:00 AM',
      present: false,
      teacher: 'Dr. Johnson'
    },
    {
      date: '2024-03-02',
      subject: 'Chemistry',
      time: '9:00 AM - 10:00 AM',
      present: true,
      teacher: 'Dr. Williams'
    },
    {
      date: '2024-03-02',
      subject: 'Biology',
      time: '10:00 AM - 11:00 AM',
      present: true,
      teacher: 'Dr. Brown'
    },
    {
      date: '2024-03-03',
      subject: 'English',
      time: '9:00 AM - 10:00 AM',
      present: true,
      teacher: 'Mrs. Davis'
    }
  ];

  // Calculate attendance statistics
  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(item => item.present).length;
  const absentClasses = totalClasses - presentClasses;
  const attendancePercentage = (presentClasses / totalClasses) * 100;

  // Sample data for class-wise attendance
  const classAttendance = [
    { subject: 'Mathematics', percentage: '85.5%', isEligible: true },
    { subject: 'Physics', percentage: '78.2%', isEligible: true },
    { subject: 'Chemistry', percentage: '92.0%', isEligible: true },
    { subject: 'Computer Science', percentage: '88.5%', isEligible: true },
    { subject: 'English', percentage: '72.8%', isEligible: false }
  ];

  // Calculate overall eligibility
  const isOverallEligible = classAttendance.filter(subject => subject.isEligible).length === classAttendance.length;

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/dashboard')}>
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
        <ProfileCard>
          <ProfileImage src="https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg" alt="Student" />
          <ProfileInfo>
            <Name>Riya Sharma</Name>
            <SubInfo>II CSE B  23CSEB01  2023-2027</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <AttendanceOverview>
          <OverviewTitle>Attendance Overview</OverviewTitle>
          <OverviewGrid>
            <OverviewCard background="#e8f5e9" color="#4CAF50">
              <h4>Present Days</h4>
              <p>{presentClasses}</p>
            </OverviewCard>
            <OverviewCard background="#ffebee" color="#f44336">
              <h4>Absent Days</h4>
              <p>{absentClasses}</p>
            </OverviewCard>
            <OverviewCard background="#e3f2fd" color="#1a73e8">
              <h4>Total Classes</h4>
              <p>{totalClasses}</p>
            </OverviewCard>
            <OverviewCard 
              background={attendancePercentage >= 75 ? '#e8f5e9' : attendancePercentage >= 60 ? '#fff3e0' : '#ffebee'}
              color={attendancePercentage >= 75 ? '#4CAF50' : attendancePercentage >= 60 ? '#ff9800' : '#f44336'}
            >
              <h4>Attendance Percentage</h4>
              <p>{attendancePercentage.toFixed(1)}%</p>
            </OverviewCard>
          </OverviewGrid>
        </AttendanceOverview>

        <EligibilityCard>
          <OverviewTitle>Exam Eligibility Status</OverviewTitle>
          <EligibilityStatus isEligible={attendancePercentage >= 75}>
            {attendancePercentage >= 75 ? (
              <>
                <CheckCircleIcon />
                Eligible for Semester Examinations
              </>
            ) : (
              <>
                <CancelIcon />
                Not Eligible for Semester Examinations
              </>
            )}
          </EligibilityStatus>
          
          <SubjectEligibility>
            <h4>Subject-wise Eligibility</h4>
            {classAttendance.map((subject, index) => (
              <SubjectStatus key={index}>
                <span>{subject.subject}</span>
                <EligibilityStatus isEligible={parseFloat(subject.percentage) >= 75}>
                  {parseFloat(subject.percentage) >= 75 ? (
                    <>
                      <CheckCircleIcon fontSize="small" />
                      Eligible ({subject.percentage})
                    </>
                  ) : (
                    <>
                      <CancelIcon fontSize="small" />
                      Not Eligible ({subject.percentage})
                    </>
                  )}
                </EligibilityStatus>
              </SubjectStatus>
            ))}
          </SubjectEligibility>
        </EligibilityCard>

        <MonthlyAttendance>
          <OverviewTitle>Attendance Records</OverviewTitle>
          <ProgressBar>
            <Progress value={attendancePercentage} />
          </ProgressBar>
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Subject</Th>
                <Th>Time</Th>
                <Th>Status</Th>
                <Th>Teacher</Th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <Td>{item.date}</Td>
                  <Td>{item.subject}</Td>
                  <Td>{item.time}</Td>
                  <Td>
                    <Status present={item.present}>
                      {item.present ? (
                        <>
                          <CheckCircleIcon style={{ fontSize: 20 }} />
                          Present
                        </>
                      ) : (
                        <>
                          <CancelIcon style={{ fontSize: 20 }} />
                          Absent
                        </>
                      )}
                    </Status>
                  </Td>
                  <Td>{item.teacher}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MonthlyAttendance>

        <ClassAttendance>
          <OverviewTitle>Class-wise Attendance Percentage</OverviewTitle>
          <ClassGrid>
            {classAttendance.map((item, index) => (
              <ClassCard key={index} percentage={parseFloat(item.percentage)}>
                <h4>{item.subject}</h4>
                <p>{item.percentage}</p>
              </ClassCard>
            ))}
          </ClassGrid>
        </ClassAttendance>

        <EligibilitySection>
          <OverviewTitle>Semester Exam Eligibility Status</OverviewTitle>
          <EligibilityStatus isEligible={isOverallEligible}>
            {isOverallEligible ? (
              <>
                <CheckCircleIcon />
                You are eligible for all semester exams
              </>
            ) : (
              <>
                <CancelIcon />
                You are not eligible for some semester exams
              </>
            )}
          </EligibilityStatus>

          <SubjectEligibility>
            <h4>Subject-wise Eligibility</h4>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Attendance</th>
                  <th>Required</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {classAttendance.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject}</td>
                    <td>{item.percentage}</td>
                    <td>75%</td>
                    <td>
                      <EligibilityBadge isEligible={parseFloat(item.percentage) >= 75}>
                        {parseFloat(item.percentage) >= 75 ? 'Eligible' : 'Not Eligible'}
                      </EligibilityBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SubjectEligibility>
        </EligibilitySection>

        <OverallStatusSection>
          <StatusTitle>
            <AssessmentIcon />
            Overall Status Summary
          </StatusTitle>
          
          <StatusGrid>
            <StatusCard background="#e3f2fd" color="#1a73e8">
              <h4>Total Working Days</h4>
              <p>
                <CalendarTodayIcon fontSize="small" />
                {totalClasses} Days
              </p>
            </StatusCard>
            
            <StatusCard background="#e8f5e9" color="#4CAF50">
              <h4>Days Present</h4>
              <p>
                <CheckCircleIcon fontSize="small" />
                {presentClasses} Days
              </p>
            </StatusCard>
            
            <StatusCard background="#ffebee" color="#f44336">
              <h4>Days Absent</h4>
              <p>
                <CancelIcon fontSize="small" />
                {absentClasses} Days
              </p>
            </StatusCard>
            
            <StatusCard 
              background={attendancePercentage >= 75 ? '#e8f5e9' : '#ffebee'}
              color={attendancePercentage >= 75 ? '#4CAF50' : '#f44336'}
            >
              <h4>Overall Attendance</h4>
              <p>
                {attendancePercentage >= 75 ? 
                  <CheckCircleIcon fontSize="small" /> : 
                  <WarningIcon fontSize="small" />
                }
                {attendancePercentage.toFixed(1)}%
              </p>
            </StatusCard>
          </StatusGrid>

          <FinalStatus isEligible={attendancePercentage >= 75}>
            {attendancePercentage >= 75 ? (
              <>
                <CheckCircleIcon />
                You are eligible to write the semester examinations
              </>
            ) : (
              <>
                <WarningIcon />
                You are not eligible to write the semester examinations. Please contact your class advisor.
              </>
            )}
          </FinalStatus>
        </OverallStatusSection>
      </MainContent>
    </Container>
  );
};

export default AttendancePage; 