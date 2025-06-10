import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPortal from './components/LoginPortal';
import StudentLogin from './components/StudentLogin';
import FacultyLogin from './components/FacultyLogin';
import MentorLogin from './components/MentorLogin';
import ClassInchargeLogin from './components/ClassInchargeLogin';
import HodLogin from './components/HodLogin';
import Dashboard from './components/Dashboard';
import Assignments from './components/Assignments';
import Attendance from './components/Attendance';
import ArrearManagement from './components/ArrearManagement';
import Notifications from './components/Notifications';
import FacultyDashboard from './components/FacultyDashboard';
import FacultyStudents from './components/FacultyStudents';
import FacultyAssignments from './components/FacultyAssignments';
import MentorDashboard from './components/MentorDashboard';
import ClassInchargeDashboard from './components/ClassInchargeDashboard';
import HodDashboard from './components/HodDashboard';
import FacultyAttendance from './components/FacultyAttendance';
import FacultyNotifications from './components/FacultyNotifications';
import SemesterMarks from './components/SemesterMarks';
import Mentees from './components/Mentees';
//import ProgressReport from './components/ProgressReport';
import ProgressReports from './components/ProgressReports';
import Schedule from './components/Schedule';
import MentorNotifications from './components/MentorNotifications';
import AttendanceManagement from './components/AttendanceManagement';
import AssignmentManagement from './components/AssignmentManagement';
import PerformanceManagement from './components/PerformanceManagement';
import ClassInchargeNotifications from './components/ClassInchargeNotifications';
import FacultyManagement from './components/FacultyManagement';
import StudentManagement from './components/StudentManagement';
import DepartmentPerformance from './components/DepartmentPerformance';
import DepartmentNotifications from './components/DepartmentNotifications';
import ClassToppers from './components/ClassToppers';
import AddFaculty from './components/AddFaculty';
import AddStudent from './components/AddStudent';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPortal />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/faculty-login" element={<FacultyLogin />} />
            <Route path="/mentor-login" element={<MentorLogin />} />
            <Route path="/class-incharge-login" element={<ClassInchargeLogin />} />
            <Route path="/hod-login" element={<HodLogin />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/student-dashboard/*"
              element={
                <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/assignments"
              element={
                <PrivateRoute>
                  <Assignments />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <PrivateRoute>
                  <Attendance />
                </PrivateRoute>
              }
            />
            <Route
              path="/arrear-management"
              element={
                <PrivateRoute>
                  <ArrearManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            
            {/* Faculty Routes */}
            <Route
              path="/faculty-dashboard"
              element={
                <PrivateRoute>
                  <FacultyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-students"
              element={
                <PrivateRoute>
                  <FacultyStudents />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-assignments"
              element={
                <PrivateRoute>
                  <FacultyAssignments />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-attendance"
              element={
                <PrivateRoute>
                  <FacultyAttendance />
                </PrivateRoute>
              }
            />
            <Route
              path="/faculty-notifications"
              element={
                <PrivateRoute>
                  <FacultyNotifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentor-dashboard/*"
              element={
                <PrivateRoute>
                  <MentorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentor-notifications"
              element={
                <PrivateRoute>
                  <MentorNotifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/class-incharge-dashboard/*"
              element={
                <PrivateRoute>
                  <ClassInchargeDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/hod-dashboard/*"
              element={
                <PrivateRoute>
                  <HodDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/semester-marks"
              element={
                <PrivateRoute>
                  <SemesterMarks />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentees"
              element={
                <PrivateRoute>
                  <Mentees />
                </PrivateRoute>
              }
            />
            <Route path="/progress-reports" element={<ProgressReports />} />
            <Route path="/progress-reports/:id" element={<ProgressReports />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route
              path="/attendance-management"
              element={
                <PrivateRoute>
                  <AttendanceManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignment-management"
              element={
                <PrivateRoute>
                  <AssignmentManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/performance-management"
              element={
                <PrivateRoute>
                  <PerformanceManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/class-incharge-notifications"
              element={
                <PrivateRoute>
                  <ClassInchargeNotifications />
                </PrivateRoute>
              }
            />
            <Route path="/faculty-management" element={<FacultyManagement />} />
            <Route path="/add-faculty" element={<AddFaculty />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/department-performance" element={<DepartmentPerformance />} />
            <Route path="/hod-notifications" element={<DepartmentNotifications />} />
            <Route path="/class-toppers" element={<ClassToppers />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 