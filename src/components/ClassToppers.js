import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
  font-family: 'Poppins', sans-serif;
`;

const Sidebar = styled.div`
  width: 280px;
  background: white;
  padding: 2rem 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 10px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  background: ${props => props.active ? '#f0f7ff' : 'transparent'};
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.95rem;
  letter-spacing: 0.3px;

  &:hover {
    background: #f0f7ff;
    color: #3498db;
    transform: translateX(5px);
  }

  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #f1c40f;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 300px;

  input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: #2c3e50;

    &::placeholder {
      color: #95a5a6;
    }
  }
`;

const TopperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TopperCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.rank === 1 ? '#f1c40f' : props.rank === 2 ? '#bdc3c7' : '#cd7f32'};
  }
`;

const TopperHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TopperAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.rank === 1 ? '#fff8e1' : props.rank === 2 ? '#f5f6fa' : '#fff3e0'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2.5rem;
    color: ${props => props.rank === 1 ? '#f1c40f' : props.rank === 2 ? '#bdc3c7' : '#cd7f32'};
  }
`;

const TopperInfo = styled.div`
  flex: 1;

  h2 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  background: ${props => props.type === 'academic' ? '#e8f5e9' : 
               props.type === 'innovation' ? '#e3f2fd' :
               props.type === 'leadership' ? '#fff3e0' : '#f3e5f5'};
  color: ${props => props.type === 'academic' ? '#2e7d32' :
              props.type === 'innovation' ? '#1565c0' :
              props.type === 'leadership' ? '#f57c00' : '#7b1fa2'};

  svg {
    font-size: 1.1rem;
  }
`;

const PerformanceChart = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`;

const SubjectScore = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubjectName = styled.span`
  width: 120px;
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ScoreBar = styled.div`
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 1rem;

  div {
    height: 100%;
    background: ${props => props.score >= 90 ? '#2ecc71' :
                props.score >= 80 ? '#3498db' :
                props.score >= 70 ? '#f1c40f' : '#e74c3c'};
    width: ${props => props.score}%;
    transition: width 1s ease;
  }
`;

const Score = styled.span`
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
  width: 40px;
`;

const ClassToppers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const toppers = [
    {
      id: 1,
      name: "Priya Sharma",
      rollNo: "CS21001",
      rank: 1,
      cgpa: "9.8",
      badges: ["academic", "innovation", "leadership"],
      subjects: [
        { name: "Data Structures", score: 98 },
        { name: "Algorithms", score: 95 },
        { name: "Database", score: 92 },
        { name: "Web Dev", score: 96 }
      ]
    },
    {
      id: 2,
      name: "Rahul Verma",
      rollNo: "CS21015",
      rank: 2,
      cgpa: "9.6",
      badges: ["academic", "innovation"],
      subjects: [
        { name: "Data Structures", score: 94 },
        { name: "Algorithms", score: 96 },
        { name: "Database", score: 90 },
        { name: "Web Dev", score: 92 }
      ]
    },
    {
      id: 3,
      name: "Aisha Patel",
      rollNo: "CS21023",
      rank: 3,
      cgpa: "9.5",
      badges: ["academic", "leadership"],
      subjects: [
        { name: "Data Structures", score: 92 },
        { name: "Algorithms", score: 93 },
        { name: "Database", score: 95 },
        { name: "Web Dev", score: 90 }
      ]
    }
  ];

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'academic':
        return <SchoolIcon />;
      case 'innovation':
        return <LightbulbIcon />;
      case 'leadership':
        return <PsychologyIcon />;
      default:
        return <StarIcon />;
    }
  };

  const getBadgeLabel = (type) => {
    switch (type) {
      case 'academic':
        return 'Academic Excellence';
      case 'innovation':
        return 'Innovation Star';
      case 'leadership':
        return 'Leadership';
      default:
        return 'Achievement';
    }
  };

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/class-incharge-dashboard')}>
          <GroupsIcon /> Overview
        </NavItem>
        <NavItem onClick={() => navigate('/attendance-management')}>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/performance-management')}>
          <AssessmentIcon /> Performance
        </NavItem>
        <NavItem active>
          <EmojiEventsIcon /> Class Toppers
        </NavItem>
        <NavItem onClick={() => navigate('/class-incharge-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/')}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <WorkspacePremiumIcon /> Class Toppers
          </Title>
          <SearchBar>
            <SearchIcon style={{ color: '#95a5a6' }} />
            <input
              type="text"
              placeholder="Search by name or register number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </Header>

        <TopperGrid>
          {toppers.map(topper => (
            <TopperCard key={topper.id} rank={topper.rank}>
              <TopperHeader>
                <TopperAvatar rank={topper.rank}>
                  <WorkspacePremiumIcon />
                </TopperAvatar>
                <TopperInfo>
                  <h2>{topper.name}</h2>
                  <p>Roll No: {topper.rollNo}</p>
                  <p>CGPA: {topper.cgpa}</p>
                </TopperInfo>
              </TopperHeader>

              <BadgeContainer>
                {topper.badges.map((badge, index) => (
                  <Badge key={index} type={badge}>
                    {getBadgeIcon(badge)}
                    {getBadgeLabel(badge)}
                  </Badge>
                ))}
              </BadgeContainer>

              <PerformanceChart>
                {topper.subjects.map((subject, index) => (
                  <SubjectScore key={index}>
                    <SubjectName>{subject.name}</SubjectName>
                    <ScoreBar score={subject.score}>
                      <div />
                    </ScoreBar>
                    <Score>{subject.score}%</Score>
                  </SubjectScore>
                ))}
              </PerformanceChart>
            </TopperCard>
          ))}
        </TopperGrid>
      </MainContent>
    </Container>
  );
};

export default ClassToppers; 