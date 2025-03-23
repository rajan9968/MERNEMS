import './App.css';
import AttendanceEmployee from './Components/Attendance/AttendanceEmployee';
import AttendanceList from './Components/Attendance/AttendanceList';
import Dashboard from './Components/ClientSide/Dashboard';
import Login from './Components/Login/Login';
import Leaves from './Components/Leaves/Leaves';
import TaskBoard from './Components/Task/TaskBoard';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RefreshHandle from './RefreshHandle';



const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <RefreshHandle setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/attendance" element={<AttendanceEmployee />} />
                <Route path="/attendance-list" element={<AttendanceList />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/task-board" element={<TaskBoard />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
