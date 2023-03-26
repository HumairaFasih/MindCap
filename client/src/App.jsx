import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import CreateAccount from './pages/CreateCounselorAccount'
import CounselorProfile from './pages/CounselorProfilePage';
import UpdateStudentAccount from './pages/UpdateStudentAccount'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="users/:counselor" element={<CounselorProfile />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/update-student-account" element={<UpdateStudentAccount />}/>
    </Routes>
  );
}

export default App;
