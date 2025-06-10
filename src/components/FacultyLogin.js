import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
`;

const GlowingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 10s infinite alternate;
  }

  &::before {
    background: #3498db;
    top: -100px;
    left: -100px;
  }

  &::after {
    background: #2980b9;
    bottom: -100px;
    right: -100px;
    animation-delay: -5s;
  }

  @keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const LoginContainer = styled(motion.div)`
  width: 90%;
  max-width: 1200px;
  min-height: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  position: relative;
  z-index: 1;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WelcomeSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #3498db 0%, #2980b9 100%);
    opacity: 0.1;
    z-index: -1;
  }
`;

const LoginSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WelcomeTitle = styled(motion.h1)`
  color: white;
  font-size: 2.5em;
  margin-bottom: 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #3498db;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }

  svg {
    font-size: 30px;
    color: #3498db;
  }
`;

const FeatureText = styled.div`
  h3 {
    color: white;
    margin: 0;
    font-size: 1.1em;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 5px 0 0;
    font-size: 0.9em;
  }
`;

const LoginForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
`;

const InputGroup = styled.div`
  position: relative;
  
  &:focus-within label {
    transform: translateY(-20px) scale(0.8);
    color: #3498db;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const LoginButton = styled(motion.button)`
  padding: 15px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FacultyLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    facultyId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: <TimelineIcon />,
      title: 'Performance Analytics',
      description: 'Track and analyze student performance metrics'
    },
    {
      icon: <AssignmentIcon />,
      title: 'Course Management',
      description: 'Manage course materials and assignments'
    },
    {
      icon: <GroupsIcon />,
      title: 'Student Engagement',
      description: 'Monitor and boost student participation'
    },
    {
      icon: <SchoolIcon />,
      title: 'Academic Planning',
      description: 'Plan and organize academic activities'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.facultyId || !formData.password) {
        setError('Please enter both Faculty ID and Password');
        return;
      }

      // Test credentials for development/testing
      if (formData.facultyId === 'FAC001' && formData.password === 'faculty123') {
        const userData = {
          id: formData.facultyId,
          role: 'faculty',
          name: 'Dr. Emma Wilson',
          department: 'Computer Science',
          designation: 'Assistant Professor',
          subjects: ['Data Structures', 'Web Development']
        };
        await login(userData);
        navigate('/faculty-dashboard');
      } else {
        setError('Invalid credentials. For testing use: FAC001/faculty123');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  return (
    <PageContainer>
      <GlowingOrbs />
      <LoginContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeSection>
          <WelcomeTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back, Faculty!
          </WelcomeTitle>
          <motion.p
            style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '30px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Access your teaching tools and manage your academic responsibilities efficiently.
          </motion.p>
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.icon}
                <FeatureText>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </FeatureText>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </WelcomeSection>

        <LoginSection>
          <LoginForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 style={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
              Faculty Login
            </h2>
            {error && <div style={{ color: '#d32f2f', background: '#fde8e8', padding: '12px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
            <InputGroup>
              <Input
                type="text"
                name="facultyId"
                placeholder="Enter Faculty ID"
                value={formData.facultyId}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                autoComplete="off"
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </InputGroup>
            <LoginButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </LoginButton>
            <motion.div
              style={{
                textAlign: 'center',
                marginTop: '20px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              <a
                href="/forgot-password"
                style={{
                  color: '#3498db',
                  textDecoration: 'none',
                  fontSize: '0.9em'
                }}
              >
                Forgot Password?
              </a>
            </motion.div>
          </LoginForm>
        </LoginSection>
      </LoginContainer>
    </PageContainer>
  );
};

export default FacultyLogin; 