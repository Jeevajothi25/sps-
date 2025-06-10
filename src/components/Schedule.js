import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
//import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GradingIcon from '@mui/icons-material/Grading';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
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
`;

const Logo = styled.div`
  color: #3498db;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    font-size: 2rem;
  }
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
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: #f0f7ff;
    color: #3498db;
  }

  .icon {
    margin-right: 1rem;
    font-size: 1.5rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
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

  .icon {
    font-size: 2rem;
    color: #3498db;
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

  .icon {
    color: #95a5a6;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

const CalendarContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #3498db;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;

    &:hover {
      background: #f0f7ff;
    }
  }
`;

const MonthYear = styled.h2`
  color: #2c3e50;
  margin: 0;
  min-width: 200px;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #eee;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const WeekDay = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  color: #7f8c8d;
`;

const Day = styled.div`
  background: white;
  padding: 1rem;
  min-height: 100px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  ${props => props.isToday && `
    background: #e8f5e9;
  `}

  ${props => props.hasEvents && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 0.5rem;
      height: 0.5rem;
      background: #3498db;
      border-radius: 50%;
    }
  `}

  &:hover {
    background: ${props => props.isToday ? '#d5ecd6' : '#f5f5f5'};
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const DayNumber = styled.div`
  font-weight: ${props => props.isToday ? '600' : '400'};
  color: ${props => props.isCurrentMonth ? '#2c3e50' : '#bdc3c7'};
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EventsSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const EventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const EventsTitle = styled.h2`
  color: #2c3e50;
  margin: 0;
  font-size: 1.25rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  .icon {
    font-size: 1.25rem;
  }
`;

const AddButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2980b9;
  }

  .icon {
    font-size: 1.25rem;
  }
`;

const EventCard = styled.div`
  padding: 1rem;
  border-left: 4px solid ${props => props.color || '#3498db'};
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateX(4px);
  }
`;

const EventTime = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    font-size: 1rem;
    color: #3498db;
  }
`;

const EventTitle = styled.div`
  color: #2c3e50;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    font-size: 1rem;
    color: #3498db;
  }
`;

const EventDetails = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    font-size: 1rem;
    color: #3498db;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? '#3498db' : 'white'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    background: ${props => props.primary ? '#2980b9' : '#f8f9fa'};
  }
`;

const Modal = styled.div`
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

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #2c3e50;
    font-weight: 500;
  }

  input, select, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Schedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'in-person',
    description: ''
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Mock data - In a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Meeting with John Doe",
      date: "2024-03-20",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Academic Review",
      color: "#3498db"
    },
    {
      id: 2,
      title: "Project Discussion with Jane Smith",
      date: "2024-03-20",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Project Review",
      color: "#e74c3c"
    },
    {
      id: 3,
      title: "Career Guidance - Mike Johnson",
      date: "2024-03-21",
      time: "11:30 AM",
      duration: "30 minutes",
      type: "Career Counseling",
      color: "#2ecc71"
    }
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendar = () => {
    const days = [];
    
    weekDays.forEach(day => {
      days.push(<WeekDay key={day}>{day}</WeekDay>);
    });

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Day key={`empty-${i}`}><DayNumber isCurrentMonth={false}></DayNumber></Day>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      const hasEvents = events.some(event => new Date(event.date).toDateString() === date.toDateString());

      days.push(
        <Day key={day} isToday={isToday} hasEvents={hasEvents}>
          <DayNumber isToday={isToday} isCurrentMonth={true}>{day}</DayNumber>
        </Day>
      );
    }

    return days;
  };

  const handleNewEvent = (e) => {
    e.preventDefault();
    // Here you would typically save the event to your backend
    console.log('New Event:', newEvent);
    setShowNewEventModal(false);
    // Reset form
    setNewEvent({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      type: 'in-person',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageContainer>
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
        <NavItem onClick={() => navigate('/semester-marks')}>
          <AssessmentIcon /> Semester Marks
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            <CalendarTodayIcon className="icon" />
            Schedule
          </Title>
          <SearchBar>
            <SearchIcon className="icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Button primary onClick={() => setShowNewEventModal(true)}>
            <AddIcon /> New Event
          </Button>
        </Header>

        <ContentGrid>
          <CalendarContainer>
            <CalendarHeader>
              <MonthNavigation>
                <button onClick={handlePrevMonth}>
                  <ChevronLeftIcon />
                </button>
                <MonthYear>
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </MonthYear>
                <button onClick={handleNextMonth}>
                  <ChevronRightIcon />
                </button>
              </MonthNavigation>
            </CalendarHeader>
            <CalendarGrid>
              {renderCalendar()}
            </CalendarGrid>
          </CalendarContainer>

          <EventsContainer>
            <EventsSection>
              <EventsHeader>
                <EventsTitle>Today's Events</EventsTitle>
                <FilterButton>
                  <FilterListIcon className="icon" />
                  Filter
                </FilterButton>
              </EventsHeader>
              {events.map(event => (
                <EventCard key={event.id} color={event.color}>
                  <EventTime>
                    <AccessTimeIcon className="icon" />
                    {event.time} ({event.duration})
                  </EventTime>
                  <EventTitle>
                    <PersonIcon className="icon" />
                    {event.title}
                  </EventTitle>
                  <EventDetails>
                    {event.type.includes('Online') && <VideoCallIcon className="icon" />}
                    {!event.type.includes('Online') && <LocationOnIcon className="icon" />}
                    {event.type}
                  </EventDetails>
                </EventCard>
              ))}
            </EventsSection>

            <EventsSection>
              <EventsHeader>
                <EventsTitle>Upcoming Events</EventsTitle>
                <AddButton>
                  <AddIcon className="icon" />
                  New Event
                </AddButton>
              </EventsHeader>
              {events.map(event => (
                <EventCard key={event.id} color={event.color}>
                  <EventTime>
                    <AccessTimeIcon className="icon" />
                    {event.date} at {event.time}
                  </EventTime>
                  <EventTitle>
                    <PersonIcon className="icon" />
                    {event.title}
                  </EventTitle>
                  <EventDetails>
                    {event.type.includes('Online') && <VideoCallIcon className="icon" />}
                    {!event.type.includes('Online') && <LocationOnIcon className="icon" />}
                    {event.type}
                  </EventDetails>
                </EventCard>
              ))}
            </EventsSection>
          </EventsContainer>
        </ContentGrid>

        {showNewEventModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <h2>Create New Event</h2>
                <CloseButton onClick={() => setShowNewEventModal(false)}>
                  <CloseIcon />
                </CloseButton>
              </ModalHeader>
              <Form onSubmit={handleNewEvent}>
                <FormGroup>
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <label>Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={newEvent.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup style={{ flex: 1 }}>
                    <label>End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={newEvent.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </div>
                <FormGroup>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Event Type</label>
                  <select
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="in-person">In Person</option>
                    <option value="virtual">Virtual Meeting</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Enter event description"
                  />
                </FormGroup>
                <ButtonGroup>
                  <Button onClick={() => setShowNewEventModal(false)}>
                    Cancel
                  </Button>
                  <Button primary type="submit">
                    Create Event
                  </Button>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Schedule; 