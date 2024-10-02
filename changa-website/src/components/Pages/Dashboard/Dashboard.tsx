// src/components/Pages/Discover/Discover.tsx
import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const Dashboard: React.FC = () => {
const { user, logout } = useAuth();
  return (
    <main>
        <div>
            <h1>Welcome {user?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    </main>
  );
};

export default Dashboard;
