import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SignInPage from './pages/SignInPage';
import CreateCounselor from './pages/CreateCounselorPage';
import CounselorProfile from './pages/CounselorProfilePage';
import EditStudentProfile from './pages/EditStudentProfilePage';
import EditCounselorProfile from './pages/EditCounselorProfilePage';
import UpdatePassword from './pages/UpdatePassword';
import StudentProfile from './pages/StudentProfilePage';
import PageNotFound from './pages/PageNotFound';
// import StudentProfileForCounselor from './pages/StudentProfileForCounselor';
import BookAppointment from './pages/BookAppointmentPage';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route index element={<PageNotFound />} />
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='login' element={<SignInPage />} />
          <Route path='update-password' element={<UpdatePassword />} />
          <Route path='create-counselor' element={<CreateCounselor />} />
          <Route path='user'>
            <Route path='student'>
              <Route path=':username' element={<StudentProfile />} />
              <Route path='edit-profile' element={<EditStudentProfile />} />
            </Route>
            <Route path='counselor'>
              <Route path=':username' element={<CounselorProfile />} />
              <Route path='edit-profile' element={<EditCounselorProfile />} />
            </Route>
          </Route>
          <Route path='book-appointment' element={<BookAppointment />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
