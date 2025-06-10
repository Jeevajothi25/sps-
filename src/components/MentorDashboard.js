import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TimelineIcon from '@mui/icons-material/Timeline';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubjectIcon from '@mui/icons-material/Subject';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';

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

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  svg {
    font-size: 24px;
    color: #1a73e8;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const CardContent = styled.div`
  text-align: center;
`;

const StatNumber = styled.h2`
  margin: 0;
  font-size: 36px;
  color: #1a73e8;
`;

const StatText = styled.p`
  margin: 5px 0 0;
  color: #666;
`;

const MenteeList = styled(Card)`
  grid-column: 1 / -1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    color: #666;
    font-weight: 500;
    background: #f8f9fe;
  }

  tr:hover {
    background: #f8f9fe;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.color};
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  background: ${props => props.primary ? '#1a73e8' : '#f8f9fe'};
  color: ${props => props.primary ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const DetailDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    max-width: 600px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.25rem;
  }

  .close-button {
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }
`;

const DetailContent = styled.div`
  padding: 24px;

  .section {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      color: #333;
      font-size: 1.1rem;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        color: #1a73e8;
      }
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
`;

const InfoCard = styled.div`
  background: #f8f9fe;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #1a73e8;
  }

  .content {
    h4 {
      margin: 0 0 4px 0;
      color: #333;
      font-size: 0.9rem;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 0.85rem;
    }
  }
`;

const SubjectList = styled.div`
  display: grid;
  gap: 12px;
`;

const SubjectCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h4 {
      margin: 0;
      color: #333;
      font-size: 1rem;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .stat {
      text-align: center;

      .label {
        color: #666;
        font-size: 0.8rem;
        margin-bottom: 4px;
      }

      .value {
        color: #333;
        font-weight: 500;
      }
    }
  }
`;

const ContactInfo = styled.div`
  display: grid;
  gap: 12px;

  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 0.9rem;

    svg {
      color: #1a73e8;
    }
  }
`;

const MentorDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const mentees = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "20CS101",
      attendance: 85,
      performance: "Good",
      status: "On Track"
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "20CS102",
      attendance: 65,
      performance: "Needs Improvement",
      status: "At Risk"
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "20CS103",
      attendance: 92,
      performance: "Excellent",
      status: "On Track"
    },
    {
      id: 4,
      name: "Sarah Williams",
      rollNo: "20CS104",
      attendance: 78,
      performance: "Good",
      status: "On Track"
    }
  ];

  const menteeDetails = {
    "20CS101": {
      personalInfo: {
        name: "John Doe",
        rollNo: "20CS101",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        address: "123 Student Housing, University Campus",
        department: "Computer Science",
        semester: 4,
        section: "A"
      },
      academics: {
        cgpa: 8.5,
        attendance: 85,
        rank: 15,
        subjects: [
          {
            name: "Data Structures",
            code: "CS201",
            attendance: 88,
            marks: 85,
            status: "Good"
          },
          {
            name: "Database Systems",
            code: "CS202",
            attendance: 82,
            marks: 78,
            status: "Good"
          },
          {
            name: "Computer Networks",
            code: "CS203",
            attendance: 85,
            marks: 82,
            status: "Good"
          }
        ]
      },
      recentActivities: [
        {
          type: "Assignment",
          description: "Submitted Database Assignment",
          date: "2024-03-15"
        },
        {
          type: "Test",
          description: "Scored 85% in Data Structures Quiz",
          date: "2024-03-10"
        },
        {
          type: "Attendance",
          description: "Maintained above 85% attendance",
          date: "2024-03-01"
        }
      ]
    },
    "20CS102": {
      personalInfo: {
        name: "Jane Smith",
        rollNo: "20CS102",
        email: "jane.smith@example.com",
        phone: "+91 98765 43211",
        address: "456 Student Housing, University Campus",
        department: "Computer Science",
        semester: 4,
        section: "A"
      },
      academics: {
        cgpa: 6.8,
        attendance: 65,
        rank: 45,
        subjects: [
          {
            name: "Data Structures",
            code: "CS201",
            attendance: 62,
            marks: 65,
            status: "Needs Improvement"
          },
          {
            name: "Database Systems",
            code: "CS202",
            attendance: 68,
            marks: 70,
            status: "Needs Improvement"
          },
          {
            name: "Computer Networks",
            code: "CS203",
            attendance: 65,
            marks: 68,
            status: "Needs Improvement"
          }
        ]
      },
      recentActivities: [
        {
          type: "Warning",
          description: "Low attendance in Data Structures",
          date: "2024-03-15"
        },
        {
          type: "Test",
          description: "Scored 65% in Database Quiz",
          date: "2024-03-12"
        },
        {
          type: "Meeting",
          description: "Counseling session scheduled",
          date: "2024-03-08"
        }
      ]
    },
    "20CS103": {
      personalInfo: {
        name: "Mike Johnson",
        rollNo: "20CS103",
        email: "mike.johnson@example.com",
        phone: "+91 98765 43212",
        address: "789 Student Housing, University Campus",
        department: "Computer Science",
        semester: 4,
        section: "A"
      },
      academics: {
        cgpa: 9.2,
        attendance: 92,
        rank: 3,
        subjects: [
          {
            name: "Data Structures",
            code: "CS201",
            attendance: 95,
            marks: 92,
            status: "Excellent"
          },
          {
            name: "Database Systems",
            code: "CS202",
            attendance: 90,
            marks: 88,
            status: "Excellent"
          },
          {
            name: "Computer Networks",
            code: "CS203",
            attendance: 91,
            marks: 90,
            status: "Excellent"
          }
        ]
      },
      recentActivities: [
        {
          type: "Achievement",
          description: "Won coding competition",
          date: "2024-03-16"
        },
        {
          type: "Test",
          description: "Scored 92% in Data Structures Quiz",
          date: "2024-03-10"
        },
        {
          type: "Project",
          description: "Selected for research project",
          date: "2024-03-05"
        }
      ]
    },
    "20CS104": {
      personalInfo: {
        name: "Sarah Williams",
        rollNo: "20CS104",
        email: "sarah.williams@example.com",
        phone: "+91 98765 43213",
        address: "321 Student Housing, University Campus",
        department: "Computer Science",
        semester: 4,
        section: "A"
      },
      academics: {
        cgpa: 7.9,
        attendance: 78,
        rank: 25,
        subjects: [
          {
            name: "Data Structures",
            code: "CS201",
            attendance: 80,
            marks: 75,
            status: "Good"
          },
          {
            name: "Database Systems",
            code: "CS202",
            attendance: 76,
            marks: 82,
            status: "Good"
          },
          {
            name: "Computer Networks",
            code: "CS203",
            attendance: 78,
            marks: 80,
            status: "Good"
          }
        ]
      },
      recentActivities: [
        {
          type: "Assignment",
          description: "Submitted all pending assignments",
          date: "2024-03-15"
        },
        {
          type: "Test",
          description: "Scored 82% in Database Quiz",
          date: "2024-03-11"
        },
        {
          type: "Project",
          description: "Started new team project",
          date: "2024-03-07"
        }
      ]
    }
  };

  const handleViewDetails = (mentee) => {
    setSelectedMentee(mentee);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedMentee(null);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case "excellent":
        return "#4CAF50";
      case "good":
        return "#1a73e8";
      case "needs improvement":
        return "#f44336";
      default:
        return "#666";
    }
  };

  return (
    <Container>
      <Sidebar>
        <NavItem active>
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
        <NavItem>
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
        <ProfileCard>
          <ProfileImage src="https://ui-avatars.com/api/?name=Mentor&background=random" alt="Mentor" />
          <ProfileInfo>
            <Name>{user.name}</Name>
            <SubInfo>Mentor - {user.department} Department</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <DashboardGrid>
          <Card>
            <CardHeader>
              <CardTitle>Total Mentees</CardTitle>
              <PersonIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>12</StatNumber>
              <StatText>Active Mentees</StatText>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Performance</CardTitle>
              <AssessmentIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>85%</StatNumber>
              <StatText>Overall Score</StatText>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>At Risk Students</CardTitle>
              <WarningIcon />
            </CardHeader>
            <CardContent>
              <StatNumber>2</StatNumber>
              <StatText>Need Attention</StatText>
            </CardContent>
          </Card>

          <MenteeList>
            <CardHeader>
              <CardTitle>Recent Mentee Updates</CardTitle>
            </CardHeader>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Attendance</th>
                  <th>Performance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mentees.map((mentee) => (
                  <tr key={mentee.id}>
                    <td>{mentee.name}</td>
                    <td>{mentee.rollNo}</td>
                    <td>{mentee.attendance}%</td>
                    <td>
                      <Status color={getStatusColor(mentee.performance)}>
                        {mentee.performance}
                      </Status>
                    </td>
                    <td>
                      <Status color={getStatusColor(mentee.status)}>
                        {mentee.status}
                      </Status>
                    </td>
                    <td>
                      <ActionButton primary onClick={() => handleViewDetails(mentee)}>
                        View Details
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </MenteeList>
        </DashboardGrid>
      </MainContent>

      <DetailDialog
        open={openDetails}
        onClose={handleCloseDetails}
        fullWidth
      >
        {selectedMentee && menteeDetails[selectedMentee.rollNo] && (
          <>
            <DialogHeader>
              <h2>Student Details</h2>
              <CloseIcon className="close-button" onClick={handleCloseDetails} />
            </DialogHeader>
            <DialogContent>
              <DetailContent>
                <div className="section">
                  <h3>
                    <PersonIcon />
                    Personal Information
                  </h3>
                  <InfoGrid>
                    <InfoCard>
                      <SchoolIcon />
                      <div className="content">
                        <h4>Department</h4>
                        <p>{menteeDetails[selectedMentee.rollNo].personalInfo.department}</p>
                      </div>
                    </InfoCard>
                    <InfoCard>
                      <TimelineIcon />
                      <div className="content">
                        <h4>Semester</h4>
                        <p>Semester {menteeDetails[selectedMentee.rollNo].personalInfo.semester}</p>
                      </div>
                    </InfoCard>
                  </InfoGrid>
                  <ContactInfo>
                    <div className="item">
                      <EmailIcon />
                      {menteeDetails[selectedMentee.rollNo].personalInfo.email}
                    </div>
                    <div className="item">
                      <PhoneIcon />
                      {menteeDetails[selectedMentee.rollNo].personalInfo.phone}
                    </div>
                    <div className="item">
                      <LocationOnIcon />
                      {menteeDetails[selectedMentee.rollNo].personalInfo.address}
                    </div>
                  </ContactInfo>
                </div>

                <div className="section">
                  <h3>
                    <SubjectIcon />
                    Academic Performance
                  </h3>
                  <InfoGrid style={{ marginBottom: '16px' }}>
                    <InfoCard>
                      <AssessmentIcon />
                      <div className="content">
                        <h4>CGPA</h4>
                        <p>{menteeDetails[selectedMentee.rollNo].academics.cgpa}</p>
                      </div>
                    </InfoCard>
                    <InfoCard>
                      <EventNoteIcon />
                      <div className="content">
                        <h4>Class Rank</h4>
                        <p>{menteeDetails[selectedMentee.rollNo].academics.rank}</p>
                      </div>
                    </InfoCard>
                  </InfoGrid>
                  <SubjectList>
                    {menteeDetails[selectedMentee.rollNo].academics.subjects.map((subject, index) => (
                      <SubjectCard key={index}>
                        <div className="header">
                          <h4>{subject.name}</h4>
                          <Status color={getStatusColor(subject.status)}>
                            {subject.status}
                          </Status>
                        </div>
                        <div className="stats">
                          <div className="stat">
                            <div className="label">Code</div>
                            <div className="value">{subject.code}</div>
                          </div>
                          <div className="stat">
                            <div className="label">Attendance</div>
                            <div className="value">{subject.attendance}%</div>
                          </div>
                          <div className="stat">
                            <div className="label">Marks</div>
                            <div className="value">{subject.marks}%</div>
                          </div>
                        </div>
                      </SubjectCard>
                    ))}
                  </SubjectList>
                </div>

                <div className="section">
                  <h3>
                    <AssessmentIcon />
                    Recent Activities
                  </h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menteeDetails[selectedMentee.rollNo].recentActivities.map((activity, index) => (
                        <tr key={index}>
                          <td>{new Date(activity.date).toLocaleDateString()}</td>
                          <td>{activity.type}</td>
                          <td>{activity.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </DetailContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate(`/progress-report/${selectedMentee.rollNo}`)}
              >
                View Full Report
              </Button>
            </DialogActions>
          </>
        )}
      </DetailDialog>
    </Container>
  );
};

export default MentorDashboard; 