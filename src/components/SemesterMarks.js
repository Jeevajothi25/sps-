import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
import SaveIcon from '@mui/icons-material/Save';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: #1a73e8;
    color: white;
    border: none;

    &:hover {
      background: #1557b0;
    }
  ` : `
    background: white;
    color: #666;
    border: 1px solid #ddd;

    &:hover {
      background: #f5f5f5;
    }
  `}

  ${props => props.success && `
    background: #4caf50;
    color: white;
    border: none;

    &:hover {
      background: #388e3c;
    }
  `}
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 20px;

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

const MarksTable = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 200px repeat(6, 1fr) 120px;
  padding: 15px;
  background: #f8f9fe;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  color: #333;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 200px repeat(6, 1fr) 120px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  align-items: center;

  &:hover {
    background: #f8f9fe;
  }

  ${props => props.warning && `
    background: #fff3e0;
    &:hover {
      background: #ffe0b2;
    }
  `}
`;

const Input = styled.input`
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: ${props => props.pass ? '#4caf50' : '#f44336'};
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  background: #4caf50;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const UploadOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const UploadModal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;

  &:hover {
    background: #f5f5f5;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed #1a73e8;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fe;
    border-color: #1557b0;
  }

  input {
    display: none;
  }
`;

const UploadIcon = styled.div`
  color: #1a73e8;
  margin-bottom: 15px;

  svg {
    font-size: 48px;
  }
`;

const UploadText = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f8f9fe;
  border-radius: 8px;
  margin-top: 15px;

  svg {
    color: #e65100;
  }
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ReviewStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: #f8f9fe;
  padding: 15px;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  p {
    margin: 5px 0 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const ProcessingStatus = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;

  svg {
    font-size: 48px;
    color: #1a73e8;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SemesterMarks = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      rollNo: "20CS101",
      name: "John Doe",
      subject1: 85,
      subject2: 78,
      subject3: 92,
      subject4: 88,
      subject5: 75,
      average: 83.6
    },
    {
      id: 2,
      rollNo: "20CS102",
      name: "Jane Smith",
      subject1: 65,
      subject2: 70,
      subject3: 68,
      subject4: 72,
      subject5: 69,
      average: 68.8
    },
    {
      id: 3,
      rollNo: "20CS103",
      name: "Mike Johnson",
      subject1: 92,
      subject2: 88,
      subject3: 95,
      subject4: 90,
      subject5: 94,
      average: 91.8
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMarkChange = (studentId, subject, value) => {
    const newValue = Math.min(100, Math.max(0, value)); // Ensure value is between 0 and 100
    setStudents(prevStudents => {
      return prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = {
            ...student,
            [subject]: newValue
          };
          // Recalculate average
          const subjects = ['subject1', 'subject2', 'subject3', 'subject4', 'subject5'];
          const sum = subjects.reduce((acc, sub) => acc + Number(updatedStudent[sub]), 0);
          updatedStudent.average = (sum / subjects.length).toFixed(1);
          return updatedStudent;
        }
        return student;
      });
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      // Simulate processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessedData({
          totalStudents: 45,
          passedStudents: 38,
          failedStudents: 7,
          highestScore: 98,
          averageScore: 76.5
        });
      }, 3000);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      // Simulate processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessedData({
          totalStudents: 45,
          passedStudents: 38,
          failedStudents: 7,
          highestScore: 98,
          averageScore: 76.5
        });
      }, 3000);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleConfirmMarks = () => {
    // Here you would typically send the processed data to your backend
    setShowUploadModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    
    // Update the students state with new data
    // This is just a simulation - in reality, you'd get this data from the PDF processing
    const newStudents = [
      {
        id: 1,
        rollNo: "20CS101",
        name: "John Doe",
        subject1: 88,
        subject2: 82,
        subject3: 90,
        subject4: 85,
        subject5: 78,
        average: 84.6
      },
      // ... more students
    ];
    setStudents(newStudents);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
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
        <NavItem onClick={() => navigate('/progress-reports')}>
          <AssessmentIcon /> Progress Reports
        </NavItem>
        
        <NavItem onClick={() => navigate('/schedule')}>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem onClick={() => navigate('/mentor-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem active>
          <NotificationsIcon /> Semester Marks
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>Semester Marks</Title>
          <ActionButtons>
            <Button onClick={() => setShowUploadModal(true)}>
              <UploadFileIcon /> Upload Marks PDF
            </Button>
            <Button primary>
              <SaveIcon /> Save Changes
            </Button>
            <Button success>
              <NotificationsActiveIcon /> Notify Students
            </Button>
          </ActionButtons>
        </Header>

        <SearchBar>
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </SearchBar>

        <MarksTable>
          <TableHeader>
            <div>Roll No</div>
            <div>Name</div>
            <div>Subject 1</div>
            <div>Subject 2</div>
            <div>Subject 3</div>
            <div>Subject 4</div>
            <div>Subject 5</div>
            <div>Average</div>
          </TableHeader>
          {filteredStudents.map(student => (
            <TableRow key={student.id} warning={student.average < 70}>
              <div>{student.rollNo}</div>
              <div>{student.name}</div>
              <div>
                <Input
                  type="number"
                  value={student.subject1}
                  onChange={(e) => handleMarkChange(student.id, 'subject1', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={student.subject2}
                  onChange={(e) => handleMarkChange(student.id, 'subject2', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={student.subject3}
                  onChange={(e) => handleMarkChange(student.id, 'subject3', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={student.subject4}
                  onChange={(e) => handleMarkChange(student.id, 'subject4', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={student.subject5}
                  onChange={(e) => handleMarkChange(student.id, 'subject5', parseInt(e.target.value))}
                />
              </div>
              <Status pass={student.average >= 70}>
                {student.average}%
                {student.average >= 70 ? <CheckCircleIcon /> : <WarningIcon />}
              </Status>
            </TableRow>
          ))}
        </MarksTable>

        {showUploadModal && (
          <UploadOverlay>
            <UploadModal>
              <CloseButton onClick={() => setShowUploadModal(false)}>
                <CloseIcon />
              </CloseButton>
              <h2>Upload Semester Marks</h2>
              
              <UploadArea
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
                <UploadIcon>
                  <CloudUploadIcon />
                </UploadIcon>
                <UploadText>
                  Drag and drop your PDF file here or click to browse
                </UploadText>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Supported format: PDF
                </div>
              </UploadArea>

              {uploadedFile && (
                <UploadedFile>
                  <PictureAsPdfIcon />
                  <span>{uploadedFile.name}</span>
                </UploadedFile>
              )}

              {isProcessing && (
                <ProcessingStatus>
                  <CloudUploadIcon />
                  <p>Processing your document...</p>
                </ProcessingStatus>
              )}

              {processedData && (
                <ReviewSection>
                  <ReviewHeader>
                    <h3>Review Summary</h3>
                  </ReviewHeader>
                  
                  <ReviewStats>
                    <StatCard>
                      <h4>Total Students</h4>
                      <p>{processedData.totalStudents}</p>
                    </StatCard>
                    <StatCard>
                      <h4>Passed</h4>
                      <p style={{ color: '#4caf50' }}>{processedData.passedStudents}</p>
                    </StatCard>
                    <StatCard>
                      <h4>Failed</h4>
                      <p style={{ color: '#f44336' }}>{processedData.failedStudents}</p>
                    </StatCard>
                    <StatCard>
                      <h4>Highest Score</h4>
                      <p>{processedData.highestScore}%</p>
                    </StatCard>
                    <StatCard>
                      <h4>Average Score</h4>
                      <p>{processedData.averageScore}%</p>
                    </StatCard>
                  </ReviewStats>

                  <Button primary onClick={handleConfirmMarks} style={{ width: '100%' }}>
                    Confirm and Notify Students
                  </Button>
                </ReviewSection>
              )}
            </UploadModal>
          </UploadOverlay>
        )}

        {showNotification && (
          <Notification>
            <CheckCircleIcon /> Marks updated successfully! Students will be notified.
          </Notification>
        )}
      </MainContent>
    </Container>
  );
};

export default SemesterMarks; 