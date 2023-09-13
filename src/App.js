import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from 'react-query'
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboards from './/components/Dashboards'
import { UserDetails, queryClient } from './Data';

import 'bootstrap/dist/css/bootstrap.css';
import "toastify-js/src/toastify.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const ProtectedRoute = ({ tokenItem, children }) => {
  if (!tokenItem) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const UnProtectedRoute = ({ tokenItem, children, user }) => {
  if (tokenItem) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [tokenItem, setTokenItem] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(user) {
      setUserDetails( JSON.parse(user));
      setTokenItem(token);
    };
  }, []);

  const value = {
    setUserDetails: setUserDetails,
    userDetails: userDetails,
    setTokenItem: setTokenItem,
    tokenItem: tokenItem
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserDetails.Provider value={value}>
        <Routes>
          <Route path="/" 
            element={
            <UnProtectedRoute tokenItem={tokenItem} user={userDetails}>
              <Login />
            </UnProtectedRoute>
            }
          />
          <Route 
            path="/login" 
            element={
              <UnProtectedRoute tokenItem={tokenItem}>
                <Login />
              </UnProtectedRoute>
            } 
          />
          <Route path="/register" element={<Signup />} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute tokenItem={tokenItem}>
                <Dashboards />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </UserDetails.Provider>
    </QueryClientProvider>
  );
};

export default App;
