import React from 'react'

import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Profile from './Profile';

const Header = () => {
  const navigate= useNavigate();

  const {user, logout}= useAuth();
  const handleLogOut=()=>{
    logout();
    console.log('clicked', user);
    navigate('/')
  }
  return (
    <div className='px-12 pb-8 flex flex-col justify-center'>
        
        <div className='flex justify-around mt-1 p-6 cursor-pointer bg-slate-50 border-2 rounded-lg py-4'>
            <Link className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300'>Home</Link>
            <a href='#gallery' className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300'>Gallery</a>
            <Link to='/home/:id/profile' className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300'>Setting</Link>
            <a href='#favorite' className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300'>Favorite</a>
            <a href='#about' className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300'>About</a>
            <button className='m-2 py-2 px-3 hover:transition-colors hover:duration-500 border-2 rounded-lg hover:bg-green-300 cursor-pointer' onClick={()=> handleLogOut()}><BiLogOut size={30}   /></button>
        </div>
    </div>
  )
}

export default Header