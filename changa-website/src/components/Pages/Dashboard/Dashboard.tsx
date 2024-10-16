import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import useStickyNav from '../../../hooks/useStickyNav';

const Dashboard: React.FC = () => {
const { user, logout } = useAuth();
useStickyNav(true);
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
