import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AssignmentIcon from '@mui/icons-material/Assignment';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #1a237e, #0d47a1, #01579b, #006064);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const BackgroundParticle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${floatAnimation} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  
  svg {
    font-size: 64px;
    color: white;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputGroup = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 15px 45px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-size: 1rem;
    color: white;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }
  }

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    opacity: 0.8;
  }
`;

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  opacity: 0.8;
  padding: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, #2196f3, #1976d2);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);

  &:hover {
    background: linear-gradient(45deg, #1976d2, #1565c0);
    box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 0.9rem;
  margin-top: 20px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  text-decoration: underline;
  width: 100%;
  
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  background: rgba(255, 107, 107, 0.1);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 30px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-3px);
  }

  svg {
    color: white;
    opacity: 0.9;
  }

  span {
    color: white;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const TestCredentials = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  h4 {
    color: white;
    margin: 0 0 15px 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  p {
    color: white;
    margin: 5px 0;
    font-size: 0.85rem;
    opacity: 0.8;
    font-family: monospace;
  }
`;

const ClassInchargeLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    inchargeId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.inchargeId || !formData.password) {
        setError('Please enter both Class Incharge ID and Password');
        return;
      }

      // Test credentials for development/testing
      if (formData.inchargeId === 'INCHARGE001' && formData.password === 'password123') {
        const userData = {
          id: formData.inchargeId,
          role: 'class_incharge',
          name: 'Prof. Sarah Johnson',
          department: 'Computer Science',
          class: 'CSE-A',
          email: 'sarah.johnson@example.com'
        };
        login(userData);
        navigate('/class-incharge-dashboard');
      } else {
        setError('Invalid credentials. For testing use: INCHARGE001/password123');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    size: Math.random() * 20 + 10,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <Container>
      {particles.map((particle, index) => (
        <BackgroundParticle
          key={index}
          size={particle.size}
          top={particle.top}
          left={particle.left}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
      
      <LoginCard>
        <Logo>
          <SchoolIcon />
        </Logo>
        <Title>Class Incharge Portal</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <PersonIcon />
            <input
              type="text"
              name="inchargeId"
              placeholder="Enter Class Incharge ID"
              value={formData.inchargeId}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </InputGroup>
          <InputGroup>
            <LockIcon />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <ShowPasswordButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </ShowPasswordButton>
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
          </LoginButton>
        </Form>

        <FeatureGrid>
          <FeatureCard>
            <AutoGraphIcon />
            <span>Performance Analytics</span>
          </FeatureCard>
          <FeatureCard>
            <GroupsIcon />
            <span>Student Management</span>
          </FeatureCard>
          <FeatureCard>
            <AssignmentIcon />
            <span>Course Planning</span>
          </FeatureCard>
          <FeatureCard>
            <SchoolIcon />
            <span>Academic Tools</span>
          </FeatureCard>
        </FeatureGrid>

        <BackToHome onClick={() => navigate('/')}>
          Return to Login Portal
        </BackToHome>
      </LoginCard>
    </Container>
  );
};

export default ClassInchargeLogin; 