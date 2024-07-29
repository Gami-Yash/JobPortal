import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Login from './login/login';
import Signup from './signUp/signUp';
import ProtectedRoute from '../src/authProviderComponents/protectedRoute';
import AdminProtectedRoute from '../src/authProviderComponents/adminProtectedRoute';
import { AuthProvider } from './authProviderComponents/authProvider';
import Details from './details/detail';
import CreatePost from './posts/createpost';
import UserProfileCard from './userProfile/userprofile'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/*  Not Protected Routes */}
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/detail" element={<Details />}/> 

        {/*  Protected Routes */}
        <Route path='/home' element={<ProtectedRoute element={Home} />} />
        <Route path='/post' element={<ProtectedRoute element={CreatePost} />} />
        <Route path='/createPost' element={<ProtectedRoute element={CreatePost} />} />
        <Route path='/job' element={<ProtectedRoute element={Home} />} />
        <Route path='/profile' element={<ProtectedRoute element={UserProfileCard}/>}/>
 
        {/*  Admin Protected Routes */}
        <Route path='/home' element={<AdminProtectedRoute element={Home} />} />

      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;