import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClassIcon from '@mui/icons-material/Class';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import TimerIcon from '@mui/icons-material/Timer';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fe;
  padding: 20px;
  gap: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  border-radius: 15px;
  padding: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  background: white;
  border-radius: 15px;
  padding: 20px;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;

  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.background || 'white'};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.color || '#333'};
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #f8f9fe;
  border-radius: 10px;
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: white;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #e8eeff;
      color: #1a73e8;
    }
  }

  h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
`;

const ClassSelector = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    background: white;

    &:focus {
      outline: none;
      border-color: #1a73e8;
    }
  }
`;

const AttendanceTable = styled.div`
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 200px repeat(31, 40px);
  background: #f8f9fe;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;

  div {
    padding: 15px;
    text-align: center;
    font-weight: bold;
    color: #333;
    border-right: 1px solid #eee;

    &:first-child, &:nth-child(2) {
      position: sticky;
      left: 0;
      background: #f8f9fe;
      z-index: 1;
    }

    &:nth-child(2) {
      left: 50px;
    }
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 200px repeat(31, 40px);
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f8f9fe;
  }

  div {
    padding: 15px;
    text-align: center;
    color: #666;
    border-right: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child, &:nth-child(2) {
      position: sticky;
      left: 0;
      background: white;
      z-index: 1;
    }

    &:nth-child(2) {
      left: 50px;
      justify-content: flex-start;
    }
  }
`;

const AttendanceCell = styled.div`
  cursor: pointer;

  svg {
    font-size: 20px;
    color: ${props => {
      switch (props.status) {
        case 'present':
          return '#4caf50';
        case 'absent':
          return '#f44336';
        case 'late':
          return '#ff9800';
        default:
          return '#ddd';
      }
    }};
  }
`;

const StudentName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #666;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fe;
  border-radius: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;

  svg {
    font-size: 20px;
    color: ${props => props.color};
  }
`;

const FacultyAttendance = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('4A');
  const [selectedSubject, setSelectedSubject] = useState('DS');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNo: '23CSE001',
      attendance: Array(31).fill(null).map(() => 
        ['present', 'absent', 'late'][Math.floor(Math.random() * 3)]
      )
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNo: '23CSE002',
      attendance: Array(31).fill(null).map(() => 
        ['present', 'absent', 'late'][Math.floor(Math.random() * 3)]
      )
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rollNo: '23CSE003',
      attendance: Array(31).fill(null).map(() => 
        ['present', 'absent', 'late'][Math.floor(Math.random() * 3)]
      )
    },
    {
      id: 4,
      name: 'Sarah Williams',
      rollNo: '23CSE004',
      attendance: Array(31).fill(null).map(() => 
        ['present', 'absent', 'late'][Math.floor(Math.random() * 3)]
      )
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon />;
      case 'absent':
        return <CancelIcon />;
      case 'late':
        return <TimerIcon />;
      default:
        return null;
    }
  };

  const getAttendanceStats = () => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let total = 0;

    students.forEach(student => {
      student.attendance.forEach(status => {
        if (status) {
          total++;
          if (status === 'present') present++;
          else if (status === 'absent') absent++;
          else if (status === 'late') late++;
        }
      });
    });

    return {
      present: Math.round((present / total) * 100),
      absent: Math.round((absent / total) * 100),
      late: Math.round((late / total) * 100)
    };
  };

  const stats = getAttendanceStats();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Sidebar>
        <NavItem onClick={() => navigate('/faculty-dashboard')}>
          <DashboardIcon /> Dashboard
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-students')}>
          <GroupIcon /> Students
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-assignments')}>
          <AssignmentIcon /> Assignments
        </NavItem>
        <NavItem active>
          <EventNoteIcon /> Attendance
        </NavItem>
        <NavItem onClick={() => navigate('/faculty-notifications')}>
          <NotificationsIcon /> Notifications
        </NavItem>
        <NavItem onClick={handleLogout}>
          <LogoutIcon /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>Attendance Management</Title>
          <SearchContainer>
            <SearchBar>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <FilterButton>
              <FilterListIcon /> Filter
            </FilterButton>
          </SearchContainer>
        </Header>

        <StatsGrid>
          <StatCard background="#e8f5e9" color="#4caf50">
            <h3><CheckCircleIcon /> Present</h3>
            <p>{stats.present}%</p>
          </StatCard>
          <StatCard background="#ffebee" color="#f44336">
            <h3><CancelIcon /> Absent</h3>
            <p>{stats.absent}%</p>
          </StatCard>
          <StatCard background="#fff3e0" color="#ff9800">
            <h3><TimerIcon /> Late</h3>
            <p>{stats.late}%</p>
          </StatCard>
          <StatCard background="#e3f2fd" color="#1a73e8">
            <h3><ClassIcon /> Total Classes</h3>
            <p>31</p>
          </StatCard>
        </StatsGrid>

        <CalendarHeader>
          <MonthSelector>
            <button onClick={handlePrevMonth}>
              <KeyboardArrowLeftIcon />
            </button>
            <h2>{getMonthName(currentMonth)}</h2>
            <button onClick={handleNextMonth}>
              <KeyboardArrowRightIcon />
            </button>
          </MonthSelector>
          <ClassSelector>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="4A">CSE 4A</option>
              <option value="4B">CSE 4B</option>
              <option value="4C">CSE 4C</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="DS">Data Structures</option>
              <option value="DBMS">Database Management</option>
              <option value="CN">Computer Networks</option>
            </select>
          </ClassSelector>
        </CalendarHeader>

        <AttendanceTable>
          <TableHeader>
            <div>#</div>
            <div>Student Name</div>
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </TableHeader>
          {filteredStudents.map((student, index) => (
            <TableRow key={student.id}>
              <div>{student.rollNo}</div>
              <div>
                <StudentName>
                  <PersonIcon />
                  {student.name}
                </StudentName>
              </div>
              {student.attendance.map((status, day) => (
                <AttendanceCell key={day} status={status}>
                  {getAttendanceIcon(status)}
                </AttendanceCell>
              ))}
            </TableRow>
          ))}
        </AttendanceTable>

        <Legend>
          <LegendItem color="#4caf50">
            <CheckCircleIcon /> Present
          </LegendItem>
          <LegendItem color="#f44336">
            <CancelIcon /> Absent
          </LegendItem>
          <LegendItem color="#ff9800">
            <TimerIcon /> Late
          </LegendItem>
        </Legend>
      </MainContent>
    </Container>
  );
};

export default FacultyAttendance; 