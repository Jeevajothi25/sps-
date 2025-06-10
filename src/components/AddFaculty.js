import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarTodayIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
`;

const Sidebar = styled.div`
  width: 280px;
  background: white;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  svg {
    font-size: 2rem;
    color: #1a237e;
  }

  h1 {
    font-size: 1.5rem;
    color: #1a237e;
    margin: 0;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#1a237e' : '#64748b'};
  background: ${props => props.active ? '#e8eaf6' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: #e8eaf6;
    color: #1a237e;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const PageHeader = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 1.8rem;
    color: #1a237e;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  p {
    margin: 0.5rem 0 0;
    color: #64748b;
  }
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormSection = styled.div`
  padding: 2rem;

  h2 {
    color: #1a237e;
    font-size: 1.25rem;
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #64748b;
    font-size: 0.875rem;
  }

  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #1a237e;
      box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
    }
  }
`;

const PhotoUploadSection = styled.div`
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const PhotoUpload = styled.div`
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a237e;
    background: rgba(26, 35, 126, 0.02);
  }

  input {
    display: none;
  }

  svg {
    font-size: 3rem;
    color: #1a237e;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    color: #64748b;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &.primary {
    background: #1a237e;
    color: white;

    &:hover {
      background: #0d47a1;
    }
  }

  &.secondary {
    background: #e8eaf6;
    color: #1a237e;

    &:hover {
      background: #c5cae9;
    }
  }
`;

const AddFaculty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    employeeId: '',
    joiningDate: '',
    qualification: '',
    specialization: '',
    experience: '',
    photo: null
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/faculty-management');
  };

  return (
    <PageContainer>
      <Sidebar>
        <Logo>
          <SchoolIcon />
          <h1>Admin Panel</h1>
        </Logo>
        <NavMenu>
          <NavItem onClick={() => navigate('/hod-dashboard')}>
            <DashboardIcon /> Dashboard
          </NavItem>
          <NavItem active>
            <PeopleIcon /> Faculty
          </NavItem>
          <NavItem onClick={() => navigate('/student-management')}>
            <SchoolIcon /> Students
          </NavItem>
          <NavItem onClick={() => navigate('/department-performance')}>
            <AssessmentIcon /> Performance
          </NavItem>
          <NavItem onClick={() => navigate('/hod-notifications')}>
            <NotificationsIcon /> Notifications
          </NavItem>
        </NavMenu>
      </Sidebar>

      <MainContent>
        <PageHeader>
          <HeaderTitle>
            <h1><PersonIcon /> Add New Faculty</h1>
            <p>Enter the details of the new faculty member</p>
          </HeaderTitle>
          <Button
            className="secondary"
            onClick={() => navigate('/faculty-management')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowBackIcon /> Back to List
          </Button>
        </PageHeader>

        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormSection>
              <h2><PersonIcon /> Personal Information</h2>
              <FormGrid>
                <FormGroup>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter first name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter last name"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email address"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormSection>
              <h2><WorkIcon /> Professional Information</h2>
              <FormGrid>
                <FormGroup>
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Designation</label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter employee ID"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormSection>
              <h2><SchoolIcon /> Academic Information</h2>
              <FormGrid>
                <FormGroup>
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter highest qualification"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter specialization"
                  />
                </FormGroup>

                <FormGroup>
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter years of experience"
                    min="0"
                  />
                </FormGroup>
              </FormGrid>
            </FormSection>

            <PhotoUploadSection>
              <h2><CloudUploadIcon /> Profile Photo</h2>
              <PhotoUpload>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="photo">
                  <CloudUploadIcon />
                  <p>{formData.photo ? formData.photo.name : 'Click or drag to upload profile photo'}</p>
                </label>
              </PhotoUpload>
            </PhotoUploadSection>

            <ButtonGroup>
              <Button
                className="secondary"
                type="button"
                onClick={() => navigate('/faculty-management')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </Button>
              <Button
                className="primary"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add Faculty
              </Button>
            </ButtonGroup>
          </FormContainer>
        </form>
      </MainContent>
    </PageContainer>
  );
};

export default AddFaculty; 