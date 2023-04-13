import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import CreateCounselor from './pages/CreateCounselorPage';
import CounselorProfile from './pages/CounselorProfilePage';
import EditStudentProfile from './pages/EditStudentProfilePage';
import EditCounselorProfile from './pages/EditCounselorProfilePage';
import UpdatePassword from './pages/UpdatePassword';
import StudentProfile from './pages/StudentProfilePage';
import PageNotFound from './pages/PageNotFound';
import BookAppointment from './pages/BookAppointmentPage';
import Dashboard from './pages/Dashboard';
import ViewNotifications from './pages/ViewNotificationsPage'
import ResolveComplaint from './pages/ResolveComplaint';
import ProtectedRoutes from './routers/ProtectedRoutes';
import LodgeComplaint from './pages/LodgeComplaint';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="create-counselor" element={<CreateCounselor />} />
          <Route path="lodge-complaint" element={<LodgeComplaint />} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="user">
            <Route path="student">
              <Route path=":user_name" element={<StudentProfile />} />
              <Route path="edit-profile" element={<EditStudentProfile />} />
            </Route>
            <Route path="counselor">
              <Route path=":user_name" element={<CounselorProfile />} />
              <Route path="edit-profile" element={<EditCounselorProfile />} />
            </Route>
          </Route>
          <Route path="book-appointment" element={<BookAppointment />} />
        </Route>
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
