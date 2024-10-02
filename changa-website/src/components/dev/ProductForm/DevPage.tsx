// src/components/Pages/Discover/Discover.tsx
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import ProductForm from './ProductForm';

const DevPage: React.FC = () => {
const { user, logout } = useAuth();
  return (
    <main>
        <div>
            <h1>Welcome {user?.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
        <ProductForm />
    </main>
  );
};

export default DevPage;
