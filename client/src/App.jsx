import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import CreateAccount from './pages/CreateCounselorAccount';
import CounselorProfile from './pages/CounselorProfilePage';
import EditStudentProfilePage from './pages/EditStudentProfilePage';
import EditCounselorProfilePage from './pages/EditCounselorProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="users/:counselor" element={<CounselorProfile />} />
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
