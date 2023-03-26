import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignInPage';
import CreateAccount from './pages/CreateAccount'
import CounselorProfile from './pages/CounselorProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="users/:counselor" element={<CounselorProfile />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
