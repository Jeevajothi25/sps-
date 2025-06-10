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
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import CircleIcon from '@mui/icons-material/Circle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ImageIcon from '@mui/icons-material/Image';

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
  display: flex;
  background: white;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ContactsList = styled.div`
  width: 300px;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;

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
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  background: ${props => props.active ? '#f8f9fe' : 'transparent'};
  border-left-color: ${props => props.active ? '#1a73e8' : 'transparent'};

  &:hover {
    background: #f8f9fe;
  }
`;

const ContactImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactName = styled.div`
  font-weight: 500;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.8rem;
    color: #666;
  }
`;

const LastMessage = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ChatActions = styled.div`
  display: flex;
  gap: 15px;
  color: #666;

  svg {
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: #f5f5f5;
      color: #1a73e8;
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 12px 20px;
  border-radius: 15px;
  font-size: 0.95rem;
  line-height: 1.4;
  ${props => props.sent ? `
    align-self: flex-end;
    background: #1a73e8;
    color: white;
    border-bottom-right-radius: 5px;
  ` : `
    align-self: flex-start;
    background: #f5f5f5;
    color: #333;
    border-bottom-left-radius: 5px;
  `}
`;

const MessageTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.sent ? 'rgba(255, 255, 255, 0.8)' : '#666'};
  margin-top: 5px;
`;

const ChatInput = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  color: #666;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
    color: #1a73e8;
  }

  ${props => props.send && `
    background: #1a73e8;
    color: white;

    &:hover {
      background: #1557b0;
      color: white;
    }
  `}
`;

const OnlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: ${props => props.online ? '#4CAF50' : '#666'};

  svg {
    font-size: 0.8rem;
  }
`;

const Messages = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(1);
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const contacts = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "Sure, I'll submit the assignment by tomorrow.",
      time: "10:30 AM",
      online: true,
      unread: 2
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      lastMessage: "Thank you for your guidance, sir.",
      time: "Yesterday",
      online: false,
      unread: 0
    },
    {
      id: 3,
      name: "Mike Johnson",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      lastMessage: "Can we schedule a meeting to discuss my progress?",
      time: "Yesterday",
      online: true,
      unread: 1
    },
    {
      id: 4,
      name: "Sarah Williams",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      lastMessage: "I've improved my attendance as suggested.",
      time: "2 days ago",
      online: false,
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sent: false,
      text: "Good morning sir, I wanted to discuss my recent assignment submission.",
      time: "10:15 AM"
    },
    {
      id: 2,
      sent: true,
      text: "Sure, what would you like to discuss?",
      time: "10:20 AM"
    },
    {
      id: 3,
      sent: false,
      text: "I'm having some difficulties with the database section. Could you please provide some guidance?",
      time: "10:25 AM"
    },
    {
      id: 4,
      sent: true,
      text: "Of course! Let's schedule a meeting tomorrow at 2 PM to go through it in detail. I'll share some resources that might help you.",
      time: "10:28 AM"
    },
    {
      id: 5,
      sent: false,
      text: "Sure, I'll submit the assignment by tomorrow.",
      time: "10:30 AM"
    }
  ];

  const selectedContactData = contacts.find(contact => contact.id === selectedContact);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to a backend
      setMessage('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        </NavItem >
        <NavItem active>
          <ChatIcon /> Messages
        </NavItem>
        <NavItem onclick={() => navigate('/schedule')}>
          <CalendarMonthIcon /> Schedule
        </NavItem>
        <NavItem onclick={() => navigate('/notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={() => navigate('/semester-marks')}>
          <AssessmentIcon /> Semester Marks
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <ContactsList>
          <SearchBar>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </SearchBar>

          {filteredContacts.map(contact => (
            <ContactItem
              key={contact.id}
              active={contact.id === selectedContact}
              onClick={() => setSelectedContact(contact.id)}
            >
              <ContactImage src={contact.image} alt={contact.name} />
              <ContactInfo>
                <ContactName>
                  {contact.name}
                  <span>{contact.time}</span>
                </ContactName>
                <LastMessage>{contact.lastMessage}</LastMessage>
              </ContactInfo>
              {contact.unread > 0 && (
                <div style={{
                  background: '#1a73e8',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>
                  {contact.unread}
                </div>
              )}
            </ContactItem>
          ))}
        </ContactsList>

        <ChatSection>
          <ChatHeader>
            <ChatInfo>
              <ContactImage src={selectedContactData.image} alt={selectedContactData.name} />
              <div>
                <h3 style={{ margin: 0 }}>{selectedContactData.name}</h3>
                <OnlineStatus online={selectedContactData.online}>
                  <CircleIcon /> {selectedContactData.online ? 'Online' : 'Offline'}
                </OnlineStatus>
              </div>
            </ChatInfo>
            <ChatActions>
              <PersonIcon />
              <MoreVertIcon />
            </ChatActions>
          </ChatHeader>

          <ChatMessages>
            {messages.map(msg => (
              <Message key={msg.id} sent={msg.sent}>
                {msg.text}
                <MessageTime sent={msg.sent}>{msg.time}</MessageTime>
              </Message>
            ))}
          </ChatMessages>

          <ChatInput>
            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <ImageIcon />
            </IconButton>
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IconButton send onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </ChatInput>
        </ChatSection>
      </MainContent>
    </Container>
  );
};

export default Messages; 