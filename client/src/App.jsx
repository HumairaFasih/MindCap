import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CreateAccount from './pages/CreateCounselorAccount';
import CounselorProfilePage from './pages/CounselorProfilePage';
import EditStudentProfilePage from './pages/EditStudentProfilePage';
import EditCounselorProfilePage from './pages/EditCounselorProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
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
    </Routes>
  );
}

export default App;
