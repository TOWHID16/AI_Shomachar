import React from 'react';
import MobileSidebar from './MobileSidebar';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
    }

  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
         <Button onClick={handleSignOut} variant="outline">
            Sign Out
         </Button>
      </div>
    </div>
  );
};

export default Navbar;
