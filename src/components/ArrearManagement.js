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
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import TimerIcon from '@mui/icons-material/Timer';
import EventIcon from '@mui/icons-material/Event';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

const Stats = styled.div`
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  color: ${props => props.active ? '#1a73e8' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-bottom: 2px solid ${props => props.active ? '#1a73e8' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #1a73e8;
  }
`;

const ArrearCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SubjectInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SubjectName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const SubjectCode = styled.span`
  color: #666;
  font-size: 14px;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  background: ${props => props.cleared ? '#e8f5e9' : '#fff3e0'};
  color: ${props => props.cleared ? '#4CAF50' : '#ff9800'};
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${props => props.primary ? '#1a73e8' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.primary ? '#1557b0' : '#e4e4e4'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const RegistrationForm = styled.div`
  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #1a73e8;
      }
    }
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
  }

  .close-button {
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }
`;

const PaymentDetails = styled.div`
  background: #f8f9fe;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;

  h4 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }

    .label {
      color: #666;
    }

    .value {
      font-weight: 500;
      color: #333;
    }
  }
`;

const SuccessDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    max-width: 400px;
  }
`;

const SuccessContent = styled.div`
  text-align: center;
  padding: 20px;

  svg {
    font-size: 48px;
    color: #4CAF50;
    margin-bottom: 16px;
  }

  h3 {
    margin: 0 0 8px 0;
    color: #333;
  }

  p {
    margin: 0 0 16px 0;
    color: #666;
  }

  .exam-details {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin: 16px 0;
    text-align: left;

    h4 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
      color: #666;
      font-size: 0.9rem;

      svg {
        font-size: 18px;
        color: #1a73e8;
        margin: 0;
      }
    }
  }
`;

const SyllabusDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    max-width: 600px;
  }
`;

const SyllabusContent = styled.div`
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    svg {
      font-size: 32px;
      color: #1a73e8;
    }

    .title {
      flex: 1;
      
      h2 {
        margin: 0 0 4px 0;
        color: #333;
      }

      .subject-code {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  .info-card {
    background: #f8f9fe;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      color: #1a73e8;
    }

    .info-content {
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
  }

  .section {
    margin-bottom: 24px;

    h3 {
      color: #333;
      font-size: 1.1rem;
      margin: 0 0 12px 0;
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        color: #1a73e8;
      }
    }

    .unit {
      background: white;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;

      h4 {
        margin: 0 0 8px 0;
        color: #333;
        font-size: 1rem;
      }

      ul {
        margin: 0;
        padding-left: 20px;
        color: #666;

        li {
          margin: 4px 0;
        }
      }
    }
  }
`;

const ArrearManagement = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('current');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [openSyllabusDialog, setOpenSyllabusDialog] = useState(false);
  const [selectedSyllabusSubject, setSelectedSyllabusSubject] = useState(null);

  const arrearData = {
    totalArrears: 2,
    clearedArrears: 1,
    pendingArrears: 1,
    nextExam: '2024-04-15',
    subjects: [
      {
        code: 'CS3201',
        name: 'Programming in C',
        semester: 2,
        status: 'pending',
        examDate: '2024-04-15',
        lastAttempt: '2023-11-20',
        attempts: 1,
        fee: 1000
      },
      {
        code: 'MA3101',
        name: 'Matrices and Calculus',
        semester: 1,
        status: 'cleared',
        examDate: '2023-11-20',
        lastAttempt: '2023-11-20',
        attempts: 1,
        fee: 1000,
        score: 65
      }
    ]
  };

  // Mock syllabus data
  const syllabusData = {
    'CS3201': {
      name: 'Programming in C',
      credits: 4,
      hours: 60,
      prerequisites: 'None',
      objectives: [
        'Understand fundamental programming concepts',
        'Learn C programming language syntax and features',
        'Develop problem-solving skills using C',
        'Implement data structures and algorithms'
      ],
      units: [
        {
          title: 'Introduction to C Programming',
          topics: [
            'History of C language',
            'Basic structure of C program',
            'Variables and data types',
            'Operators and expressions'
          ]
        },
        {
          title: 'Control Structures',
          topics: [
            'Decision making statements',
            'Looping statements',
            'Break and continue',
            'Switch case'
          ]
        },
        {
          title: 'Functions and Arrays',
          topics: [
            'Function declaration and definition',
            'Parameter passing methods',
            'Array declaration and initialization',
            'Multi-dimensional arrays'
          ]
        },
        {
          title: 'Pointers and Structures',
          topics: [
            'Pointer concepts',
            'Dynamic memory allocation',
            'Structure and union',
            'File handling basics'
          ]
        },
        {
          title: 'Advanced Topics',
          topics: [
            'Command line arguments',
            'Preprocessor directives',
            'Standard library functions',
            'Project implementation'
          ]
        }
      ]
    },
    'MA3101': {
      name: 'Matrices and Calculus',
      credits: 4,
      hours: 60,
      prerequisites: 'Basic Mathematics',
      objectives: [
        'Understanding matrix operations',
        'Learn differential calculus',
        'Master integral calculus',
        'Apply concepts to real-world problems'
      ],
      units: [
        {
          title: 'Matrices and Determinants',
          topics: [
            'Matrix operations',
            'Types of matrices',
            'Determinants',
            'System of linear equations'
          ]
        },
        {
          title: 'Differential Calculus',
          topics: [
            'Limits and continuity',
            'Differentiation',
            'Applications of derivatives',
            'Partial derivatives'
          ]
        },
        {
          title: 'Integral Calculus',
          topics: [
            'Indefinite integrals',
            'Definite integrals',
            'Applications of integration',
            'Multiple integrals'
          ]
        },
        {
          title: 'Vector Calculus',
          topics: [
            'Vector functions',
            'Gradient and divergence',
            'Line integrals',
            'Surface integrals'
          ]
        },
        {
          title: 'Differential Equations',
          topics: [
            'First order differential equations',
            'Second order differential equations',
            'Applications in engineering',
            'Numerical methods'
          ]
        }
      ]
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRegisterClick = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    const formData = {
      subject: selectedSubject,
      registrationDate: new Date().toLocaleDateString(),
      examDate: selectedSubject.examDate,
      paymentStatus: 'Completed',
      amount: selectedSubject.fee,
      hallTicketNumber: `HT${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    };
    setRegistrationData(formData);
    setOpenDialog(false);
    setShowSuccess(true);
    setShowSnackbar(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setRegistrationData(null);
  };

  const handleViewSyllabus = (subject) => {
    setSelectedSyllabusSubject(subject);
    setOpenSyllabusDialog(true);
  };

  const handleCloseSyllabus = () => {
    setOpenSyllabusDialog(false);
    setSelectedSyllabusSubject(null);
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/student-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={() => navigate('/attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem active>
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
        <Title>Arrear Management</Title>

        <Stats>
          <StatCard background="#fff3e0" color="#ff9800">
            <h3><WarningIcon /> Total Arrears</h3>
            <p>{arrearData.totalArrears}</p>
          </StatCard>
          <StatCard background="#e8f5e9" color="#4CAF50">
            <h3><CheckCircleIcon /> Cleared Arrears</h3>
            <p>{arrearData.clearedArrears}</p>
          </StatCard>
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3><TimerIcon /> Pending Arrears</h3>
            <p>{arrearData.pendingArrears}</p>
          </StatCard>
          <StatCard background="#f3e5f5" color="#9c27b0">
            <h3><CalendarTodayIcon /> Next Exam</h3>
            <p>{new Date(arrearData.nextExam).toLocaleDateString()}</p>
          </StatCard>
        </Stats>

        <TabContainer>
          <Tab 
            active={activeTab === 'current'} 
            onClick={() => setActiveTab('current')}
          >
            Current Semester
          </Tab>
          <Tab 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            History
          </Tab>
        </TabContainer>

        {arrearData.subjects.map((subject, index) => (
          <ArrearCard key={index}>
            <SubjectInfo>
              <div>
                <SubjectName>{subject.name}</SubjectName>
                <SubjectCode>{subject.code} • Semester {subject.semester}</SubjectCode>
              </div>
              <Status cleared={subject.status === 'cleared'}>
                {subject.status === 'cleared' ? (
                  <>
                    <CheckCircleIcon fontSize="small" />
                    Cleared
                  </>
                ) : (
                  <>
                    <WarningIcon fontSize="small" />
                    Pending
                  </>
                )}
              </Status>
            </SubjectInfo>

            <Details>
              <DetailItem>
                <EventIcon fontSize="small" />
                Exam Date: {new Date(subject.examDate).toLocaleDateString()}
              </DetailItem>
              <DetailItem>
                <CalendarTodayIcon fontSize="small" />
                Last Attempt: {new Date(subject.lastAttempt).toLocaleDateString()}
              </DetailItem>
              <DetailItem>
                <AssignmentLateIcon fontSize="small" />
                Attempts: {subject.attempts}
              </DetailItem>
              <DetailItem>
                <DescriptionIcon fontSize="small" />
                Fee: ₹{subject.fee}
              </DetailItem>
              {subject.score && (
                <DetailItem>
                  <CheckCircleIcon fontSize="small" />
                  Score: {subject.score}
                </DetailItem>
              )}
            </Details>

            {subject.status === 'pending' && (
              <ButtonGroup>
                <Button onClick={() => handleViewSyllabus(subject)}>
                  <DescriptionIcon fontSize="small" />
                  View Syllabus
                </Button>
                <Button primary onClick={() => handleRegisterClick(subject)}>
                  <EventIcon fontSize="small" />
                  Register for Exam
                </Button>
              </ButtonGroup>
            )}
          </ArrearCard>
        ))}
      </MainContent>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogHeader>
          <h2>Exam Registration</h2>
          <CloseIcon className="close-button" onClick={handleCloseDialog} />
        </DialogHeader>
        <DialogContent>
          <RegistrationForm>
            <form onSubmit={handleSubmitRegistration}>
              <div className="form-group">
                <label>Subject Code</label>
                <input type="text" value={selectedSubject?.code} disabled />
              </div>
              <div className="form-group">
                <label>Subject Name</label>
                <input type="text" value={selectedSubject?.name} disabled />
              </div>
              <div className="form-group">
                <label>Exam Date</label>
                <input type="text" value={selectedSubject?.examDate} disabled />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select required>
                  <option value="">Select Payment Method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>

              <PaymentDetails>
                <h4>
                  <PaymentIcon />
                  Payment Details
                </h4>
                <div className="detail-row">
                  <span className="label">Exam Fee</span>
                  <span className="value">₹{selectedSubject?.fee}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Processing Fee</span>
                  <span className="value">₹50</span>
                </div>
                <div className="detail-row">
                  <span className="label">Total Amount</span>
                  <span className="value">₹{selectedSubject?.fee + 50}</span>
                </div>
              </PaymentDetails>

              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button primary type="submit">
                  <PaymentIcon fontSize="small" />
                  Pay & Register
                </Button>
              </DialogActions>
            </form>
          </RegistrationForm>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        open={showSuccess}
        onClose={handleCloseSuccess}
      >
        <DialogContent>
          <SuccessContent>
            <CheckCircleIcon />
            <h3>Registration Successful!</h3>
            <p>Your exam registration has been confirmed.</p>

            <div className="exam-details">
              <h4>Exam Details</h4>
              <div className="detail-item">
                <EventIcon />
                Exam Date: {registrationData?.examDate}
              </div>
              <div className="detail-item">
                <DescriptionIcon />
                Subject: {registrationData?.subject?.name}
              </div>
              <div className="detail-item">
                <ReceiptIcon />
                Hall Ticket: {registrationData?.hallTicketNumber}
              </div>
            </div>

            <Button primary onClick={handleCloseSuccess}>
              Close
            </Button>
          </SuccessContent>
        </DialogContent>
      </SuccessDialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Exam registration completed successfully!
        </Alert>
      </Snackbar>

      <SyllabusDialog
        open={openSyllabusDialog}
        onClose={handleCloseSyllabus}
        fullWidth
      >
        <DialogContent>
          <SyllabusContent>
            {selectedSyllabusSubject && syllabusData[selectedSyllabusSubject.code] && (
              <>
                <div className="header">
                  <MenuBookIcon />
                  <div className="title">
                    <h2>{syllabusData[selectedSyllabusSubject.code].name}</h2>
                    <div className="subject-code">{selectedSyllabusSubject.code}</div>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <SchoolIcon />
                    <div className="info-content">
                      <h4>Credits</h4>
                      <p>{syllabusData[selectedSyllabusSubject.code].credits} Credits</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <AccessTimeIcon />
                    <div className="info-content">
                      <h4>Duration</h4>
                      <p>{syllabusData[selectedSyllabusSubject.code].hours} Hours</p>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h3>
                    <ListAltIcon />
                    Course Objectives
                  </h3>
                  <ul>
                    {syllabusData[selectedSyllabusSubject.code].objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h3>
                    <MenuBookIcon />
                    Syllabus Units
                  </h3>
                  {syllabusData[selectedSyllabusSubject.code].units.map((unit, index) => (
                    <div className="unit" key={index}>
                      <h4>Unit {index + 1}: {unit.title}</h4>
                      <ul>
                        {unit.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </SyllabusContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSyllabus}>Close</Button>
        </DialogActions>
      </SyllabusDialog>
    </Container>
  );
};

export default ArrearManagement; 