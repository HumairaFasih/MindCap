import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import CreateAccount from './pages/CreateCounselorAccount';
import CounselorProfilePage from './pages/CounselorProfilePage';
import EditStudentProfilePage from './pages/EditStudentProfilePage';
import EditCounselorProfilePage from './pages/EditCounselorProfilePage';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentProfileForCounselorPage from './pages/StudentProfileForCounselor';
// import BookAppointment from './pages/BookAppointment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="users/:counselor" element={<CounselorProfilePage />} />
      <Route path="/create-counselor-account" element={<CreateAccount />} />
      <Route
        path="/edit-student-profile"
        element={<EditStudentProfilePage />}
      />
      <Route
        path="/edit-counselor-profile"
        element={<EditCounselorProfilePage />}
      />
      <Route
        path="users/student-profile" 
        element = {<StudentProfilePage/>}
      />
      <Route
        path="/view-student-profile"
        element = {<StudentProfileForCounselorPage/>}
      />
    </Routes>
  );
}

export default App;
