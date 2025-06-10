import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';

const moveBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  position: relative;
  background: linear-gradient(
    45deg,
    #1a237e,
    #0d47a1,
    #283593,
    #1565c0,
    #0277bd,
    #0288d1
  );
  background-size: 300% 300%;
  animation: ${moveBackground} 15s ease infinite;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    animation: ${pulse} 3s infinite;
  }

  &::before {
    top: -10%;
    right: -10%;
    animation-delay: 0s;
  }

  &::after {
    bottom: -10%;
    left: -10%;
    animation-delay: 1.5s;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.05) 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    animation: ${float} 6s infinite;
  }

  &::before {
    top: 20%;
    left: 10%;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    animation-delay: 0s;
  }

  &::after {
    bottom: 20%;
    right: 10%;
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
    animation-delay: 3s;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  overflow: hidden;
  width: 1000px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(to right, #1a237e, #0d47a1);
  }
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 3rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(26, 35, 126, 0.9), rgba(13, 71, 161, 0.9));
    z-index: -1;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(26, 35, 126, 0.2);
  animation: ${float} 6s ease-in-out infinite;

  svg {
    font-size: 50px;
    color: white;
  }
`;

const Title = styled.h1`
  color: #1a237e;
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
  font-weight: 600;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #546e7a;
  margin: 0 0 2rem;
  font-size: 1.1rem;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const CustomInput = React.memo(({ type, name, value, onChange, onFocus, onBlur, icon: Icon, showPassword, onTogglePassword, placeholder }) => {
  return (
    <div style={{
      position: 'relative',
      marginBottom: '1.5rem',
      width: '100%'
    }}>
      <Icon style={{
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#90a4ae'
      }} />
      <input
        type={type}
        name={name}
        style={{
          width: '100%',
          padding: '1rem 1rem 1rem 3rem',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          fontSize: '1rem',
          color: '#37474f',
          transition: 'all 0.3s ease',
          outline: 'none',
          background: 'white'
        }}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
                 required
         autoComplete="new-password"
      />
      {onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#90a4ae',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      )}
    </div>
  );
});

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(26, 35, 126, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const WelcomeSection = styled.div`
  text-align: left;
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0 0 1rem;
  font-weight: 600;
`;

const WelcomeText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;

  svg {
    font-size: 2rem;
  }

  div {
    flex: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: #1a237e;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;
  width: 100%;
  transition: color 0.3s ease;

  &:hover {
    color: #0d47a1;
  }
`;

const HodLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    hodId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Clear form data and any autocomplete on mount
    setFormData({
      hodId: '',
      password: ''
    });
    // Clear any autocomplete values
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }, []);

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
      if (!formData.hodId || !formData.password) {
        setError('Please enter both HOD ID and Password');
        return;
      }

      // Authentication check
      if (formData.hodId === 'CSE_HOD001' && formData.password === 'hodcse@123') {
        const userData = {
          id: formData.hodId,
          role: 'hod',
          name: 'Dr. James Wilson',
          department: 'Computer Science',
          email: 'james.wilson@example.com'
        };
        login(userData);
        navigate('/hod-dashboard');
      } else {
        setError('Invalid credentials. Example - HOD ID: CSE_HOD001, Password: hodcse@123');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <DashboardIcon />,
      title: "Department Overview",
      description: "Monitor department performance and metrics"
    },
    {
      icon: <GroupsIcon />,
      title: "Faculty Management",
      description: "Manage faculty assignments and responsibilities"
    },
    {
      icon: <AssessmentIcon />,
      title: "Academic Analytics",
      description: "Track academic progress and generate reports"
    }
  ];

  return (
    <Container>
      <BackgroundPattern />
      <FloatingShapes />
      <LoginWrapper>
        <LeftPanel>
          <Logo>
            <AdminPanelSettingsIcon />
          </Logo>
          <Title>HOD Portal</Title>
          <Subtitle>Department of Computer Science</Subtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <CustomInput
              type="text"
              name="hodId"
              placeholder="Enter HOD ID"
              value={formData.hodId}
              onChange={handleChange}
              icon={PersonIcon}
            />
            <CustomInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              icon={LockIcon}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <LoginButton type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </LoginButton>
          </Form>

          <BackToHome onClick={() => navigate('/')}>
            Back to Login Portal
          </BackToHome>
        </LeftPanel>

        <RightPanel>
          <WelcomeSection>
            <WelcomeTitle>Welcome Back!</WelcomeTitle>
            <WelcomeText>
              Access your department's comprehensive management system to oversee academic operations, 
              faculty performance, and student progress.
            </WelcomeText>
          </WelcomeSection>

          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                {feature.icon}
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </FeatureItem>
            ))}
          </FeatureList>
        </RightPanel>
      </LoginWrapper>
    </Container>
  );
};

export default HodLogin;
