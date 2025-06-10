import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentReportPDF from './StudentReportPDF';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fe;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 24px;
`;

const Subtitle = styled.p`
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

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const SearchBar = styled.div`
  flex: 1;
  max-width: 400px;
  position: relative;

  input {
    width: 100%;
    padding: 12px 40px 12px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }

  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }

  ${props => props.primary && `
    background: #1a73e8;
    color: white;
    border: none;

    &:hover {
      background: #1557b0;
    }
  `}
`;

const DownloadButton = styled(ActionButton)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.primary ? '#1557b0' : '#f5f5f5'};
  }
`;

const LoadingButton = styled(ActionButton)`
  opacity: 0.7;
  cursor: not-allowed;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const StudentImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const StudentDetails = styled.div`
  flex: 1;
`;

const StudentName = styled.h3`
  margin: 0;
  color: #333;
`;

const StudentId = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

const Metric = styled.div`
  padding: 10px;
  background: ${props => props.background || '#f8f9fe'};
  border-radius: 8px;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.color || '#333'};
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
`;

const ProgressBar = styled.div`
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 10px 0;
  overflow: hidden;

  div {
    height: 100%;
    background: ${props => props.color || '#1a73e8'};
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.color};
  font-size: 0.9rem;
  margin-top: 10px;
`;

const Chart = styled.div`
  height: 100px;
  background: #f8f9fe;
  border-radius: 8px;
  margin: 15px 0;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  gap: 8px;
`;

const Bar = styled.div`
  flex: 1;
  background: ${props => props.color || '#1a73e8'};
  height: ${props => props.height}%;
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
`;

const ProgressReports = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const reports = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "20CS101",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      cgpa: 8.5,
      attendance: 85,
      assignments: 90,
      internals: 82,
      status: "Excellent",
      improvement: "+5%",
      subjects: {
        "Data Structures": 85,
        "Algorithms": 88,
        "Database": 92,
        "Networks": 80
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "20CS102",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      cgpa: 6.8,
      attendance: 65,
      assignments: 70,
      internals: 65,
      status: "Needs Improvement",
      improvement: "-2%",
      subjects: {
        "Data Structures": 65,
        "Algorithms": 68,
        "Database": 72,
        "Networks": 60
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "20CS103",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      cgpa: 9.2,
      attendance: 92,
      assignments: 95,
      internals: 88,
      status: "Excellent",
      improvement: "+8%",
      subjects: {
        "Data Structures": 95,
        "Algorithms": 92,
        "Database": 88,
        "Networks": 90
      }
    },
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "20CS104",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      cgpa: 7.9,
      attendance: 78,
      assignments: 85,
      internals: 75,
      status: "Good",
      improvement: "+3%",
      subjects: {
        "Data Structures": 75,
        "Algorithms": 82,
        "Database": 78,
        "Networks": 80
      }
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Excellent":
        return "#4CAF50";
      case "Good":
        return "#1a73e8";
      case "Needs Improvement":
        return "#f44336";
      default:
        return "#666";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Excellent":
        return <TrendingUpIcon />;
      case "Good":
        return <CheckCircleIcon />;
      case "Needs Improvement":
        return <WarningIcon />;
      default:
        return null;
    }
  };

  if (id) {
    const report = reports.find(r => r.id === parseInt(id));
    
    if (!report) {
      return (
        <Container>
          <Sidebar>
            <NavItem onClick={() => navigate('/mentor-dashboard')}>
              <HomeIcon /> Dashboard
            </NavItem>
            <NavItem onClick={() => navigate('/mentees')}>
              <GroupIcon /> Mentees
            </NavItem>
            <NavItem active>
              <AssessmentIcon /> Progress Reports
            </NavItem >
            
            <NavItem onclick ={() => navigate('/schedule')}>
              <CalendarMonthIcon /> Schedule
            </NavItem>
            <NavItem onclick ={() => navigate('/mentor-notifications')}>
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
              <Title>Student Not Found</Title>
              <Subtitle>The requested student report could not be found.</Subtitle>
            </Header>
            <ActionButton onClick={() => navigate('/mentees')}>
              Back to Mentees List
            </ActionButton>
          </MainContent>
        </Container>
      );
    }

    return (
      <Container>
        <Sidebar>
          <NavItem onClick={() => navigate('/mentor-dashboard')}>
            <HomeIcon /> Dashboard
          </NavItem>
          <NavItem onClick={() => navigate('/mentees')}>
            <GroupIcon /> Mentees
          </NavItem>
          <NavItem onclick ={() => navigate('/progress-reports')}>
            <AssessmentIcon /> Progress Reports
          </NavItem >
          
          <NavItem onclick ={() => navigate('/schedule')}>
            <CalendarMonthIcon /> Schedule
          </NavItem>
          <NavItem onclick ={() => navigate('/mentor-notifications')}>
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
            <Title>Student Progress Report</Title>
            <Subtitle>Detailed performance analysis for {report.name}</Subtitle>
          </Header>

          <ActionBar>
            <ActionButton onClick={() => navigate('/mentees')}>
              <ArrowBackIcon /> Back to Mentees
            </ActionButton>
            <ActionButton>
              <PrintIcon /> Print Report
            </ActionButton>
            <PDFDownloadLink
              document={<StudentReportPDF report={report} />}
              fileName={`${report.rollNo}_progress_report.pdf`}
              style={{ textDecoration: 'none' }}
            >
              {({ blob, url, loading, error }) => 
                loading ? (
                  <LoadingButton>
                    <DownloadIcon /> Preparing PDF...
                  </LoadingButton>
                ) : (
                  <DownloadButton>
                    <DownloadIcon /> Download PDF
                  </DownloadButton>
                )
              }
            </PDFDownloadLink>
            <ActionButton primary>
              <ShareIcon /> Share Report
            </ActionButton>
          </ActionBar>

          <ReportCard style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <StudentInfo>
              <StudentImage src={report.image} alt={report.name} style={{ width: '100px', height: '100px' }}/>
              <StudentDetails>
                <StudentName>{report.name}</StudentName>
                <StudentId>{report.rollNo}</StudentId>
              </StudentDetails>
            </StudentInfo>

            <MetricsGrid>
              <Metric background="#e8f5e9">
                <MetricValue color="#2e7d32">{report.cgpa}</MetricValue>
                <MetricLabel>CGPA</MetricLabel>
              </Metric>
              <Metric background="#e3f2fd">
                <MetricValue color="#1565c0">{report.attendance}%</MetricValue>
                <MetricLabel>Attendance</MetricLabel>
              </Metric>
              <Metric background="#fff3e0">
                <MetricValue color="#e65100">{report.assignments}%</MetricValue>
                <MetricLabel>Assignments</MetricLabel>
              </Metric>
              <Metric background="#f3e5f5">
                <MetricValue color="#7b1fa2">{report.internals}%</MetricValue>
                <MetricLabel>Internals</MetricLabel>
              </Metric>
            </MetricsGrid>

            <div style={{ marginTop: '2rem' }}>
              <h4>Subject Performance</h4>
              {Object.entries(report.subjects).map(([subject, score]) => (
                <div key={subject}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span>{subject}</span>
                    <span>{score}%</span>
                  </div>
                  <ProgressBar color={score >= 80 ? '#4CAF50' : score >= 70 ? '#1a73e8' : '#f44336'} progress={score}>
                    <div />
                  </ProgressBar>
                </div>
              ))}
            </div>

            <Status color={getStatusColor(report.status)}>
              {getStatusIcon(report.status)}
              {report.status}
              <span style={{ marginLeft: 'auto', color: report.improvement.startsWith('+') ? '#4CAF50' : '#f44336' }}>
                {report.improvement}
              </span>
            </Status>

            <Chart>
              {Object.values(report.subjects).map((value, index) => (
                <Bar
                  key={index}
                  height={value}
                  color={value >= 80 ? '#4CAF50' : value >= 70 ? '#1a73e8' : '#f44336'}
                />
              ))}
            </Chart>
          </ReportCard>
        </MainContent>
      </Container>
    );
  }

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/mentor-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/mentees')}>
          <GroupIcon /> Mentees
        </NavItem>
        <NavItem onclick ={() => navigate('/progress-reports')}>
          <AssessmentIcon /> Progress Reports
        </NavItem >
        
        <NavItem onclick ={() => navigate('/schedule')}>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem onclick ={() => navigate('/mentor-notifications')}>
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
          <Title>Progress Reports</Title>
          <Subtitle>Track and analyze student performance metrics</Subtitle>
        </Header>

        <ActionBar>
          <SearchBar>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </SearchBar>
          <ActionButton>
            <FilterListIcon /> Filter
          </ActionButton>
          <ActionButton>
            <DownloadIcon /> Export
          </ActionButton>
          <ActionButton>
            <PrintIcon /> Print
          </ActionButton>
          <ActionButton primary>
            <ShareIcon /> Share Reports
          </ActionButton>
        </ActionBar>

        <ReportGrid>
          {filteredReports.map(report => (
            <ReportCard key={report.id} onClick={() => navigate(`/progress-reports/${report.id}`)}>
              <StudentInfo>
                <StudentImage src={report.image} alt={report.name} />
                <StudentDetails>
                  <StudentName>{report.name}</StudentName>
                  <StudentId>{report.rollNo}</StudentId>
                </StudentDetails>
              </StudentInfo>

              <MetricsGrid>
                <Metric background="#e8f5e9">
                  <MetricValue color="#2e7d32">{report.cgpa}</MetricValue>
                  <MetricLabel>CGPA</MetricLabel>
                </Metric>
                <Metric background="#e3f2fd">
                  <MetricValue color="#1565c0">{report.attendance}%</MetricValue>
                  <MetricLabel>Attendance</MetricLabel>
                </Metric>
                <Metric background="#fff3e0">
                  <MetricValue color="#e65100">{report.assignments}%</MetricValue>
                  <MetricLabel>Assignments</MetricLabel>
                </Metric>
                <Metric background="#f3e5f5">
                  <MetricValue color="#7b1fa2">{report.internals}%</MetricValue>
                  <MetricLabel>Internals</MetricLabel>
                </Metric>
              </MetricsGrid>

              <div>
                <h4>Subject Performance</h4>
                {Object.entries(report.subjects).map(([subject, score]) => (
                  <div key={subject}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>{subject}</span>
                      <span>{score}%</span>
                    </div>
                    <ProgressBar color={score >= 80 ? '#4CAF50' : score >= 70 ? '#1a73e8' : '#f44336'} progress={score}>
                      <div />
                    </ProgressBar>
                  </div>
                ))}
              </div>

              <Status color={getStatusColor(report.status)}>
                {getStatusIcon(report.status)}
                {report.status}
                <span style={{ marginLeft: 'auto', color: report.improvement.startsWith('+') ? '#4CAF50' : '#f44336' }}>
                  {report.improvement}
                </span>
              </Status>

              <Chart>
                {Object.values(report.subjects).map((value, index) => (
                  <Bar
                    key={index}
                    height={value}
                    color={value >= 80 ? '#4CAF50' : value >= 70 ? '#1a73e8' : '#f44336'}
                  />
                ))}
              </Chart>

              <ActionButton primary style={{ width: '100%', marginTop: '15px' }}>
                View Detailed Report
              </ActionButton>
            </ReportCard>
          ))}
        </ReportGrid>
      </MainContent>
    </Container>
  );
};

export default ProgressReports; 