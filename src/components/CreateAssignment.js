import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #333;
  }

  input, select, textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.primary && `
    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
    color: white;

    &:hover {
      opacity: 0.9;
    }
  `}

  ${props => props.secondary && `
    background: white;
    color: #666;
    border: 1px solid #ddd;

    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const FileUpload = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a73e8;
    background: #f8f9fe;
  }

  input {
    display: none;
  }
`;

const PreviewSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  h3 {
    margin: 0 0 15px 0;
    color: #333;
  }
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    color: #333;
  }
`;

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    class: '',
    dueDate: '',
    totalMarks: '',
    description: '',
    files: []
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    navigate('/faculty-assignments');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <HomeIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/students')}>
          <PeopleIcon /> Students
        </NavItem>
        <NavItem onClick={()=>navigate('/faculty-assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem onClick={()=>navigate('/faculty-attendance')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={()=>navigate('/notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ProfileCard>
          <ProfileImage src="https://th.bing.com/th/id/OIP.yoybF28YEteSu9J-spETQQHaLG?w=115&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Faculty" />
          <ProfileInfo>
            <Name>Dr. Sarah Johnson</Name>
            <SubInfo>Professor - Computer Science Department</SubInfo>
          </ProfileInfo>
        </ProfileCard>

        <HeaderBar>
          <Button secondary onClick={() => navigate('/faculty-assignments')}>
            <ArrowBackIcon /> Back to Assignments
          </Button>
          <h2>Create New Assignment</h2>
        </HeaderBar>

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Assignment Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter assignment title"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              >
                <option value="">Select Subject</option>
                <option value="Data Structures">Data Structures</option>
                <option value="DBMS">DBMS</option>
                <option value="Web Technologies">Web Technologies</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Class</label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({...formData, class: e.target.value})}
                required
              >
                <option value="">Select Class</option>
                <option value="II CSE A">II CSE A</option>
                <option value="II CSE B">II CSE B</option>
                <option value="III CSE A">III CSE A</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Total Marks</label>
              <input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
                placeholder="Enter total marks"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter assignment description"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Attachments</label>
              <FileUpload>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <AttachFileIcon />
                  <p>Click to upload files or drag and drop</p>
                  <small>Maximum file size: 10MB</small>
                </label>
              </FileUpload>
              {formData.files.length > 0 && (
                <div>
                  <p>Selected files:</p>
                  <ul>
                    {formData.files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </FormGroup>

            <PreviewSection>
              <h3>Preview</h3>
              <div>
                <p><strong>Title:</strong> {formData.title || 'Not specified'}</p>
                <p><strong>Subject:</strong> {formData.subject || 'Not specified'}</p>
                <p><strong>Class:</strong> {formData.class || 'Not specified'}</p>
                <p><strong>Due Date:</strong> {formData.dueDate || 'Not specified'}</p>
                <p><strong>Total Marks:</strong> {formData.totalMarks || 'Not specified'}</p>
                <p><strong>Description:</strong></p>
                <p>{formData.description || 'No description provided'}</p>
              </div>
            </PreviewSection>

            <ButtonGroup>
              <Button type="submit" primary>
                <AssignmentIcon /> Create Assignment
              </Button>
              <Button type="button" secondary onClick={() => navigate('/faculty-assignments')}>
                Cancel
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </MainContent>
    </Container>
  );
};

export default CreateAssignment; 