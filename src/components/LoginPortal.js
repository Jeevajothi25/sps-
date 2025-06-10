import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1b 0%, #1f1f3a 100%);
  padding: 20px;
  overflow: hidden;
  position: relative;
  perspective: 1000px;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(62, 62, 255, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(255, 62, 62, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 50% 50%, rgba(62, 255, 62, 0.1) 0%, transparent 50%);
    pointer-events: none;
    animation: backgroundPulse 10s ease-in-out infinite alternate;
  }

  @keyframes backgroundPulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const WaveBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle at center, transparent 30%, rgba(99, 102, 241, 0.1) 70%);
    animation: rotate 20s linear infinite;
    transform-origin: center center;
  }

  &::after {
    animation: rotate 30s linear infinite reverse;
    background: radial-gradient(circle at center, transparent 30%, rgba(236, 72, 153, 0.1) 70%);
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
`;

const GridOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 2;
  transform: perspective(1000px) rotateX(60deg) scale(2.5);
  transform-origin: center center;
  opacity: 0.5;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1400px;
`;

const Title = styled(motion.div)`
  color: white;
  margin-bottom: 60px;
  text-align: center;
  position: relative;

  h1 {
    font-size: 4.5rem;
    font-weight: 900;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
    letter-spacing: -1px;
    position: relative;
    display: inline-block;

    &::after {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.5;
      filter: blur(40px);
      transform: translateY(10px);
    }

    @media (max-width: 768px) {
      font-size: 2.8rem;
    }
  }

  p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 15px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 4px;
    opacity: 0.8;
  }
`;

const LoginGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  width: 100%;
  padding: 20px;
  transform-style: preserve-3d;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 40px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    z-index: -1;
    animation: borderGlow 3s linear infinite;
  }

  @keyframes borderGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IconWrapper = styled(motion.div)`
  width: 120px;
  height: 120px;
  position: relative;
  margin-bottom: 30px;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    background: ${props => `linear-gradient(45deg, 
      rgba(${props.rgbColor}, 0.8), 
      rgba(${props.rgbColor}, 0.2), 
      rgba(${props.rgbColor}, 0.8)
    )`};
    border-radius: 35px;
    z-index: -1;
    animation: borderRotate 4s linear infinite;
    filter: blur(5px);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 32px;
    z-index: -1;
  }

  @keyframes borderRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  svg {
    font-size: 60px;
    color: ${props => `rgba(${props.rgbColor}, 1)`};
    filter: drop-shadow(0 0 20px ${props => `rgba(${props.rgbColor}, 0.6)`});
  }
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 35px;
`;

const LoginButton = styled(motion.button)`
  background: transparent;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  color: white;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => `linear-gradient(45deg,
      rgba(${props.rgbColor}, 0.3),
      rgba(${props.rgbColor}, 0.5),
      rgba(${props.rgbColor}, 0.3)
    )`};
    z-index: -2;
    border-radius: 30px;
    transition: all 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 29px;
    z-index: -1;
    transition: opacity 0.3s;
  }

  &:hover::before {
    filter: brightness(1.2) contrast(1.2);
    transform: scale(1.05);
  }

  &:hover::after {
    opacity: 0.5;
  }

  span {
    position: relative;
    z-index: 1;
    background: ${props => `linear-gradient(90deg,
      rgba(${props.rgbColor}, 1),
      rgba(${props.rgbColor}, 0.8),
      rgba(${props.rgbColor}, 1)
    )`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
`;

const LoginPortal = () => {
  const navigate = useNavigate();
  const [particles, setParticles] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.2})`
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.login-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = async (path, index) => {
    setSelectedCard(index);
    await controls.start({
      scale: [1, 1.1, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.5 }
    });
    navigate(path);
  };

  const loginOptions = [
    {
      title: 'Student Portal',
      description: 'Access your personalized academic dashboard with real-time updates on attendance, assignments, and course materials',
      icon: <SchoolIcon />,
      path: '/student-login',
      rgbColor: '99, 102, 241'  // Indigo
    },
    {
      title: 'Faculty Hub',
      description: 'Comprehensive teaching management system with advanced grading tools and student performance analytics',
      icon: <PersonIcon />,
      path: '/faculty-login',
      rgbColor: '236, 72, 153'  // Pink
    },
    {
      title: 'Mentor Space',
      description: 'Dedicated platform for student guidance, career counseling, and academic progress monitoring',
      icon: <SupervisorAccountIcon />,
      path: '/mentor-login',
      rgbColor: '14, 165, 233'  // Sky
    },
    {
      title: 'Class Management',
      description: 'Centralized system for class coordination, attendance tracking, and faculty collaboration',
      icon: <GroupsIcon />,
      path: '/class-incharge-login',
      rgbColor: '34, 197, 94'  // Green
    },
    {
      title: 'HOD Dashboard',
      description: 'Advanced analytics and management tools for department oversight and academic excellence',
      icon: <AdminPanelSettingsIcon />,
      path: '/hod-login',
      rgbColor: '249, 115, 22'  // Orange
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1 
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      rotateX: -15
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.02,
      rotateX: 5,
      rotateY: 5,
      z: 50,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      rotateX: 0,
      rotateY: 0,
      z: 0
    }
  };

  return (
    <Container>
      <WaveBackground />
      <ParticleContainer>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            size={particle.size}
            color={particle.color}
            animate={{
              x: [particle.x - 100, particle.x + 100],
              y: [particle.y - 100, particle.y + 100],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse"
            }}
          />
        ))}
      </ParticleContainer>
      <GridOverlay />
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title variants={titleVariants}>
          <h1 data-text="Academic Management System">Academic Management System</h1>
          <p>Choose Your Portal</p>
        </Title>
        <LoginGrid>
          {loginOptions.map((option, index) => (
            <LoginCard
              key={index}
              className="login-card"
              variants={cardVariants}
              initial="hidden"
              animate={selectedCard === index ? controls : "visible"}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleCardClick(option.path, index)}
            >
              <IconWrapper 
                rgbColor={option.rgbColor}
                animate={{
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {option.icon}
              </IconWrapper>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
              <LoginButton
                rgbColor={option.rgbColor}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Access Portal</span>
              </LoginButton>
            </LoginCard>
          ))}
        </LoginGrid>
      </ContentWrapper>
    </Container>
  );
};

export default LoginPortal; 