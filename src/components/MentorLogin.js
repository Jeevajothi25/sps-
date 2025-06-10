import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';

const moveGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  padding: 20px;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      rgba(156, 39, 176, 0.1) 0%,
      rgba(103, 58, 183, 0.1) 25%,
      rgba(63, 81, 181, 0.1) 50%,
      rgba(103, 58, 183, 0.1) 75%,
      rgba(156, 39, 176, 0.1) 100%
    );
    background-size: 400% 400%;
    animation: ${moveGradient} 15s ease infinite;
    transform: rotate(45deg);
  }
`;

const CyberGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, rgba(156, 39, 176, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(156, 39, 176, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: top;
  opacity: 0.5;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Orb = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(156, 39, 176, 0.6), transparent);
  filter: blur(8px);
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  opacity: 0.3;
`;

const LoginContainer = styled(motion.div)`
  width: 90%;
  max-width: 1400px;
  min-height: 700px;
  display: flex;
  position: relative;
  z-index: 1;
  background: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  box-shadow: 
    0 0 30px rgba(156, 39, 176, 0.2),
    0 0 60px rgba(156, 39, 176, 0.1),
    0 0 90px rgba(156, 39, 176, 0.05);

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #9c27b0, #673ab7, #3f51b5, #673ab7, #9c27b0);
    background-size: 400% 400%;
    animation: ${moveGradient} 15s ease infinite;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(20, 20, 20, 0.9);
    backdrop-filter: blur(10px);
    z-index: -1;
  }
`;

const BorderFrame = styled.div`
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(156, 39, 176, 0.2);
  pointer-events: none;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid #9c27b0;
  }

  &::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
    box-shadow: -5px -5px 20px rgba(156, 39, 176, 0.3);
  }

  &::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
    box-shadow: 5px 5px 20px rgba(156, 39, 176, 0.3);
  }
`;

const WelcomeSection = styled.div`
  flex: 1.2;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 1px solid rgba(156, 39, 176, 0.2);
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9));

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(103, 58, 183, 0.1) 0%, transparent 50%);
  }
`;

const HexGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  padding: 20px;
  transform: rotate(-15deg) scale(1.5);
  animation: ${pulse} 10s ease-in-out infinite;
`;

const Hexagon = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, rgba(156, 39, 176, 0.3), rgba(103, 58, 183, 0.3));
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    background: inherit;
    filter: brightness(1.5);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
`;

const WelcomeTitle = styled(motion.h1)`
  color: white;
  font-size: 3.2em;
  margin-bottom: 20px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 20px rgba(156, 39, 176, 0.5);

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, #9c27b0, transparent);
    box-shadow: 0 0 20px rgba(156, 39, 176, 0.5);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 60px;
  position: relative;
  perspective: 1000px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  &:hover {
    transform: translateZ(20px);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(156, 39, 176, 0.2));
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    background: linear-gradient(45deg, #9c27b0, #673ab7) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  svg {
    font-size: 40px;
    color: #9c27b0;
    filter: drop-shadow(0 0 10px rgba(156, 39, 176, 0.3));
    transform: translateZ(20px);
  }
`;

const LoginSection = styled.div`
  flex: 0.8;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(25, 25, 25, 0.5);
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(156, 39, 176, 0.1), transparent 70%);
  }
`;

const LoginForm = styled(motion.form)`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  backdrop-filter: blur(5px);
  padding: 40px;
  border: 1px solid rgba(156, 39, 176, 0.2);
  background: rgba(30, 30, 30, 0.3);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(45deg, #9c27b0, #673ab7);
    z-index: -1;
    opacity: 0.3;
  }
`;

const InputGroup = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, #9c27b0, transparent);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 25px;
  background: rgba(30, 30, 30, 0.6);
  border: none;
  border-left: 1px solid rgba(156, 39, 176, 0.3);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:focus {
    outline: none;
    background: rgba(40, 40, 40, 0.8);
    border-left-color: #9c27b0;
    box-shadow: 0 0 20px rgba(156, 39, 176, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const LoginButton = styled(motion.button)`
  padding: 18px;
  background: linear-gradient(45deg, #9c27b0, #673ab7);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  transition: all 0.3s ease;

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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(156, 39, 176, 0.3);
  }
`;

const StatsOverlay = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #9c27b0;
  }
`;

const MentorLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    mentorId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: <SupervisorAccountIcon />,
      title: 'Student Mentoring',
      description: 'Guide and support student development'
    },
    {
      icon: <TimelineIcon />,
      title: 'Progress Tracking',
      description: 'Monitor mentee growth and achievements'
    },
    {
      icon: <GroupsIcon />,
      title: 'Group Sessions',
      description: 'Conduct mentoring sessions and workshops'
    },
    {
      icon: <AssignmentIcon />,
      title: 'Action Plans',
      description: 'Create and track development plans'
    }
  ];

  // Generate random positions for orbs
  const orbs = Array.from({ length: 5 }, (_, i) => ({
    size: Math.random() * 200 + 100,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 4
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.mentorId || !formData.password) {
        setError('Please enter both Mentor ID and Password');
        return;
      }
      
      // Test credentials for development/testing
      if (formData.mentorId === 'MENTOR001' && formData.password === 'mentor123') {
        // Successful login
        const userData = {
          id: formData.mentorId,
          role: 'mentor',
          name: 'Dr. Sarah Wilson',
          department: 'Computer Science',
          specialization: 'Software Engineering'
        };
        login(userData); // Set auth state
        navigate('/mentor-dashboard');
      } else {
        setError('Invalid credentials. For testing use: MENTOR001/mentor123');
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
    setError('');
  };

  return (
    <PageContainer>
      <CyberGrid />
      <FloatingOrbs>
        {orbs.map((orb, index) => (
          <Orb
            key={index}
            style={{ left: orb.left, top: orb.top }}
            size={orb.size}
            duration={orb.duration}
          />
        ))}
      </FloatingOrbs>
      <LoginContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BorderFrame />
        <WelcomeSection>
          <HexGrid>
            {Array.from({ length: 32 }).map((_, i) => (
              <Hexagon
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </HexGrid>

          <WelcomeTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
              Mentor Portal
          </WelcomeTitle>
          <motion.p
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1em',
              lineHeight: '1.6',
              maxWidth: '600px',
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
                         Access your mentoring tools and guide your students towards success
          </motion.p>
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  rotateX: 5,
                  rotateY: 5
                }}
                whileTap={{ scale: 0.98 }}
              >
                {feature.icon}
                <div>
                  <h3 style={{
                    color: 'white',
                    margin: '0 0 10px 0',
                    fontSize: '1.2em',
                    letterSpacing: '1px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                    fontSize: '0.9em',
                    lineHeight: '1.6'
                  }}>
                    {feature.description}
                  </p>
                </div>
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ textAlign: 'center' }}
            >
              <SupervisorAccountIcon
                style={{
                  fontSize: '50px',
                  color: '#9c27b0',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 0 10px rgba(156, 39, 176, 0.3))'
                }}
              />
              <h2 style={{
                color: 'white',
                margin: '0 0 40px 0',
                fontSize: '1.8em',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Mentor Login
              </h2>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  color: '#ff1744',
                  background: 'rgba(255, 23, 68, 0.1)',
                  padding: '15px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 23, 68, 0.3)'
                }}
              >
                {error}
              </motion.div>
            )}

            <InputGroup>
              <Input
                type="text"
                name="mentorId"
                placeholder="Enter Mentor ID"
                value={formData.mentorId}
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
                             {isLoading ? 'Logging in...' : 'Login'}
            </LoginButton>

            <motion.div
              style={{
                textAlign: 'center',
                marginTop: '20px'
              }}
            >
              <a
                href="/forgot-password"
                style={{
                  color: '#9c27b0',
                  textDecoration: 'none',
                  fontSize: '0.9em',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.8}
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

export default MentorLogin; 