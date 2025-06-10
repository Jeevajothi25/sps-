import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #7f8c8d;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${props => props.iconColor || '#3498db'};
    }
  }
  
  p {
    color: #2c3e50;
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: ${props => props.trendUp ? '#2ecc71' : '#e74c3c'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    color: #2c3e50;
    font-weight: 600;
  }

  td {
    color: #2c3e50;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #f8f9fa;
  }
`;

const PerformanceIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    switch(props.level) {
      case 'Excellent': return '#e8f5e9';
      case 'Good': return '#e3f2fd';
      case 'Average': return '#fff3e0';
      case 'NeedsImprovement': return '#ffebee';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'Excellent': return '#2e7d32';
      case 'Good': return '#1976d2';
      case 'Average': return '#f57c00';
      case 'NeedsImprovement': return '#c62828';
      default: return '#616161';
    }
  }};
`;

const OverallPerformanceSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;

  svg {
    color: #3498db;
  }
`;

const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SubjectPerformance = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
`;

const SubjectRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubjectInfo = styled.div`
  flex: 1;
  margin-right: 1rem;

  h4 {
    margin: 0 0 0.25rem 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;

  div {
    height: 100%;
    background: ${props => 
      props.value >= 90 ? '#2ecc71' :
      props.value >= 75 ? '#3498db' :
      props.value >= 60 ? '#f1c40f' : '#e74c3c'
    };
    width: ${props => props.value}%;
    transition: width 1s ease;
  }
`;

const ClassRankCard = styled.div`
  background: #f0f7ff;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;

  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
  }

  .rank {
    font-size: 3rem;
    font-weight: bold;
    color: #3498db;
    margin: 1rem 0;
  }

  .total {
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .percentile {
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    
    p {
      margin: 0;
      color: #2c3e50;
      font-weight: 500;
    }
  }
`;

const PerformanceTrend = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const TrendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TrendCard = styled.div`
  background: ${props => props.trend === 'up' ? '#e8f5e9' : props.trend === 'down' ? '#ffebee' : '#fff8e1'};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.trend === 'up' ? '#c8e6c9' : props.trend === 'down' ? '#ffcdd2' : '#fff3cd'};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: ${props => props.trend === 'up' ? '#2e7d32' : props.trend === 'down' ? '#c62828' : '#f57c00'};
    }
  }

  .info {
    flex: 1;

    h4 {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    p {
      margin: 0;
      color: ${props => props.trend === 'up' ? '#2e7d32' : props.trend === 'down' ? '#c62828' : '#f57c00'};
      font-weight: 500;
    }
  }
`;

const PerformanceManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for student performance
  const students = [
    {
      id: 1,
      name: "John Doe",
      regNo: "23CSE001",
      cgpa: 8.9,
      attendance: 95,
      assignments: 100,
      performance: "Excellent",
      trend: "up"
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "23CSE002",
      cgpa: 8.5,
      attendance: 92,
      assignments: 95,
      performance: "Good",
      trend: "up"
    },
    {
      id: 3,
      name: "Mike Johnson",
      regNo: "23CSE003",
      cgpa: 7.8,
      attendance: 85,
      assignments: 80,
      performance: "Average",
      trend: "down"
    },
    {
      id: 4,
      name: "Sarah Williams",
      regNo: "23CSE004",
      cgpa: 6.5,
      attendance: 75,
      assignments: 70,
      performance: "NeedsImprovement",
      trend: "down"
    }
  ];

  // Mock data for overall performance
  const subjectsPerformance = [
    { name: 'Data Structures', code: 'CS201', average: 85, students: 60 },
    { name: 'Database Management', code: 'CS202', average: 78, students: 58 },
    { name: 'Computer Networks', code: 'CS203', average: 82, students: 59 },
    { name: 'Operating Systems', code: 'CS204', average: 76, students: 57 },
    { name: 'Web Development', code: 'CS205', average: 88, students: 60 }
  ];

  const classRank = {
    current: 3,
    total: 12,
    percentile: 85,
    trends: [
      { metric: 'Overall CGPA', value: '+0.2', trend: 'up' },
      { metric: 'Class Rank', value: '-2', trend: 'up' },
      { metric: 'Attendance', value: '-5%', trend: 'down' },
      { metric: 'Assignment Completion', value: '95%', trend: 'neutral' }
    ]
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
        <NavItem active>
          <AssessmentIcon /> Performance
        </NavItem>
        <NavItem onClick={() => navigate('/class-toppers')}>
          <EmojiEventsIcon /> Class Toppers
        </NavItem>
        <NavItem onClick={() => navigate('/class-incharge-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/')}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <AssessmentIcon />
            Student Performance
          </Title>
          <Button primary>
            <DownloadIcon /> Export Report
          </Button>
        </Header>

        <ActionBar>
          <SearchBar>
            <SearchIcon style={{ color: '#95a5a6' }} />
            <input
              type="text"
              placeholder="Search by name or register number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Button>
            <FilterListIcon /> Filter
          </Button>
        </ActionBar>

        <StatsGrid>
          <StatCard iconColor="#2ecc71" trendUp>
            <h3><StarIcon /> High Performers</h3>
            <p>15</p>
            <div className="trend">
              <TrendingUpIcon /> +3 from last month
            </div>
          </StatCard>
          <StatCard iconColor="#3498db" trendUp>
            <h3><CheckCircleIcon /> Average CGPA</h3>
            <p>8.2</p>
            <div className="trend">
              <TrendingUpIcon /> +0.2 improvement
            </div>
          </StatCard>
          <StatCard iconColor="#e74c3c">
            <h3><WarningIcon /> Need Attention</h3>
            <p>5</p>
            <div className="trend" style={{ color: '#e74c3c' }}>
              <TrendingDownIcon /> Critical cases
            </div>
          </StatCard>
          <StatCard iconColor="#f39c12" trendUp>
            <h3><TimelineIcon /> Class Progress</h3>
            <p>85%</p>
            <div className="trend">
              <TrendingUpIcon /> On track
            </div>
          </StatCard>
        </StatsGrid>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>CGPA</th>
              <th>Attendance %</th>
              <th>Assignments %</th>
              <th>Performance</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PersonIcon style={{ color: '#95a5a6' }} />
                    {student.name}
                  </div>
                </td>
                <td>{student.regNo}</td>
                <td>{student.cgpa}</td>
                <td>{student.attendance}%</td>
                <td>{student.assignments}%</td>
                <td>
                  <PerformanceIndicator level={student.performance}>
                    {student.performance === 'NeedsImprovement' ? 'Needs Improvement' : student.performance}
                  </PerformanceIndicator>
                </td>
                <td>
                  {student.trend === 'up' ? (
                    <TrendingUpIcon style={{ color: '#2ecc71' }} />
                  ) : (
                    <TrendingDownIcon style={{ color: '#e74c3c' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <OverallPerformanceSection>
          <SectionTitle>
            <TimelineIcon /> Overall Class Performance
          </SectionTitle>
          
          <PerformanceGrid>
            <SubjectPerformance>
              {subjectsPerformance.map((subject, index) => (
                <SubjectRow key={index}>
                  <SubjectInfo>
                    <h4>{subject.name}</h4>
                    <p>{subject.code} • {subject.students} students</p>
                  </SubjectInfo>
                  <ProgressBar value={subject.average}>
                    <div />
                  </ProgressBar>
                  <span style={{ marginLeft: '1rem', fontWeight: '500', width: '45px' }}>
                    {subject.average}%
                  </span>
                </SubjectRow>
              ))}
            </SubjectPerformance>

            <ClassRankCard>
              <h3>Class Ranking</h3>
              <div className="rank">{classRank.current}</div>
              <div className="total">out of {classRank.total} Classes</div>
              <div className="percentile">
                <p>Top {classRank.percentile}th Percentile</p>
              </div>
            </ClassRankCard>
          </PerformanceGrid>

          <PerformanceTrend>
            <SectionTitle>
              <TrendingUpIcon /> Performance Trends
            </SectionTitle>
            
            <TrendGrid>
              {classRank.trends.map((item, index) => (
                <TrendCard key={index} trend={item.trend}>
                  <div className="icon">
                    {item.trend === 'up' ? <TrendingUpIcon /> : 
                     item.trend === 'down' ? <TrendingDownIcon /> : 
                     <TimelineIcon />}
                  </div>
                  <div className="info">
                    <h4>{item.metric}</h4>
                    <p>{item.value}</p>
                  </div>
                </TrendCard>
              ))}
            </TrendGrid>
          </PerformanceTrend>
        </OverallPerformanceSection>
      </MainContent>
    </Container>
  );
};

export default PerformanceManagement; 