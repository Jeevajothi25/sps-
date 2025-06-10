import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
`;

const ProfileCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 20px;
  grid-column: 1 / -1;
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
  color: #333;
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

const SemesterSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  grid-column: 1 / -1;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#1a73e8' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#666'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#1557b0' : '#e4e4e4'};
  }
`;

const MarksTable = styled.table`
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

const GradeCell = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  background: ${props => {
    switch (props.grade) {
      case 'O': return '#e8f5e9';
      case 'A+': return '#e3f2fd';
      case 'A': return '#e8eaf6';
      case 'B+': return '#fff3e0';
      case 'B': return '#fce4ec';
      case 'U': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.grade) {
      case 'O': return '#4CAF50';
      case 'A+': return '#1a73e8';
      case 'A': return '#3f51b5';
      case 'B+': return '#ff9800';
      case 'B': return '#e91e63';
      case 'U': return '#f44336';
      default: return '#666';
    }
  }};
`;

const SemesterSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const SummaryCard = styled.div`
  background: ${props => props.background || '#f8f9fe'};
  padding: 20px;
  border-radius: 8px;
  text-align: center;

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

const ChartSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  grid-column: 1 / -1;
`;

const ChartTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${props => props.color};
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSemester, setActiveSemester] = useState(1);

  const semesterData = {
    1: {
      subjects: [
        { code: 'MA3101', name: 'Matrices and Calculus', credits: 4, grade: 'O', attendance: '95%', marks: 95 },
        { code: 'PH3101', name: 'Engineering Physics', credits: 3, grade: 'A+', attendance: '92%', marks: 88 },
        { code: 'CY3101', name: 'Engineering Chemistry', credits: 3, grade: 'A', attendance: '88%', marks: 85 },
        { code: 'GE3101', name: 'Problem Solving Using Python', credits: 3, grade: 'O', attendance: '96%', marks: 92 },
        { code: 'GE3102', name: 'Engineering Graphics', credits: 4, grade: 'A+', attendance: '90%', marks: 87 }
      ],
      gpa: 9.45,
      totalCredits: 17,
      attendance: '92%'
    },
    2: {
      subjects: [
        { code: 'MA3201', name: 'Statistics and Numerical Methods', credits: 4, grade: 'A+', attendance: '93%', marks: 89 },
        { code: 'CS3201', name: 'Programming in C', credits: 3, grade: 'O', attendance: '95%', marks: 94 },
        { code: 'CS3202', name: 'Data Structures', credits: 4, grade: 'A+', attendance: '91%', marks: 88 },
        { code: 'CS3203', name: 'Object Oriented Programming', credits: 3, grade: 'A', attendance: '89%', marks: 86 },
        { code: 'GE3201', name: 'Basic Electronics', credits: 3, grade: 'B+', attendance: '87%', marks: 78 }
      ],
      gpa: 9.20,
      totalCredits: 17,
      attendance: '91%'
    },
    3: {
      subjects: [
        { code: 'CS3301', name: 'Database Management Systems', credits: 4, grade: 'A+', attendance: '94%', marks: 88 },
        { code: 'CS3302', name: 'Computer Networks', credits: 3, grade: 'A', attendance: '90%', marks: 85 },
        { code: 'CS3303', name: 'Operating Systems', credits: 4, grade: 'B+', attendance: '88%', marks: 76 },
        { code: 'CS3304', name: 'Software Engineering', credits: 3, grade: 'A+', attendance: '92%', marks: 89 },
        { code: 'CS3305', name: 'Web Technologies', credits: 3, grade: 'O', attendance: '95%', marks: 93 }
      ],
      gpa: 8.95,
      totalCredits: 17,
      attendance: '92%'
    }
  };

  const getChartData = () => {
    return semesterData[activeSemester].subjects.map(subject => ({
      name: subject.code,
      marks: subject.marks,
      average: 85,
      target: 90
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0 0 5px 0' }}><strong>{label}</strong></p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              margin: '0',
              color: entry.color
            }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Sidebar>
        <NavItem active>
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
        <NavItem onClick={() => navigate('/notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ProfileCard>
          <ProfileImage 
            src="https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg" 
            alt="Student" 
          />
          <ProfileInfo>
            <Name>Riya Sharma</Name>
            <SubInfo>II CSE B  23CSEB01  2023-2027</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <SemesterSection>
          <TabContainer>
            {Object.keys(semesterData).map(sem => (
              <Tab
                key={sem}
                active={activeSemester === parseInt(sem)}
                onClick={() => setActiveSemester(parseInt(sem))}
              >
                Semester {sem}
              </Tab>
            ))}
          </TabContainer>

          <SemesterSummary>
            <SummaryCard background="#e3f2fd" color="#1a73e8">
              <h4>GPA</h4>
              <p>{semesterData[activeSemester].gpa}</p>
            </SummaryCard>
            <SummaryCard background="#e8f5e9" color="#4CAF50">
              <h4>Total Credits</h4>
              <p>{semesterData[activeSemester].totalCredits}</p>
            </SummaryCard>
            <SummaryCard background="#fff3e0" color="#ff9800">
              <h4>Average Attendance</h4>
              <p>{semesterData[activeSemester].attendance}</p>
            </SummaryCard>
          </SemesterSummary>

          <MarksTable>
            <thead>
              <tr>
                <Th>Course Code</Th>
                <Th>Course Name</Th>
                <Th>Credits</Th>
                <Th>Grade</Th>
                <Th>Attendance</Th>
              </tr>
            </thead>
            <tbody>
              {semesterData[activeSemester].subjects.map((subject, index) => (
                <tr key={index}>
                  <Td>{subject.code}</Td>
                  <Td>{subject.name}</Td>
                  <Td>{subject.credits}</Td>
                  <Td>
                    <GradeCell grade={subject.grade}>{subject.grade}</GradeCell>
                  </Td>
                  <Td>{subject.attendance}</Td>
                </tr>
              ))}
            </tbody>
          </MarksTable>

          <ChartSection>
            <ChartTitle>Performance Analysis</ChartTitle>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="marks" name="Marks" fill="#1a73e8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" name="Class Average" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target Score" fill="#ff9800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <ChartLegend>
              <LegendItem>
                <LegendColor color="#1a73e8" />
                Your Score
              </LegendItem>
              <LegendItem>
                <LegendColor color="#4CAF50" />
                Class Average
              </LegendItem>
              <LegendItem>
                <LegendColor color="#ff9800" />
                Target Score
              </LegendItem>
            </ChartLegend>
          </ChartSection>
        </SemesterSection>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
