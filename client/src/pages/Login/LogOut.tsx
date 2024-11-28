
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../redux/utils/auth';
const LogOut: React.FC = () => {


  const navigate = useNavigate();
  useEffect(() => {
    logOutUser()
    navigate('/home')
  }, [])
  return (
    <>
    </>
  );
}

export default LogOut;
