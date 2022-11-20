import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { auth } from '../Firebase';



const TopNavBar = () => {

  const { user, LogOut } = UserAuth();
  const navigate = useNavigate();

  const HandleSignOut = async () => {

    try {
      LogOut(auth)
      navigate('/')
    } catch (error) {

    }
  };


  return (
    <div className='className="fixed top-0 right-0 left-0 mx-auto z-[100] py-0"'>
      <div className="flex" id="navbar-default">

        {!user?.email ? <ul className="flex gap-4 items-center text-black p-1 ">

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
          </li>

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/SignUp'} className="block py-2 pr-4 pl-3">SignUp</NavLink>
          </li>

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/SignIn'} className="block py-2 pr-4 pl-3">SignIn</NavLink>
          </li>

        </ul> : <ul className="flex gap-4 items-center text-black p-1 ">

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
          </li>

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/Discover'} className="block py-2 pr-4 pl-3">Discover</NavLink>
          </li>

          <li className="hover:text-[#dbdbdb]">
            <NavLink to={'/Account'} className="block py-2 pr-4 pl-3">Account: {user?.email}</NavLink>
          </li>

          <li className="hover:text-[#dbdbdb]">
            <button onClick={HandleSignOut}>Sign Out</button>
          </li>

        </ul>}



      </div>
    </div>
  )
}

export default TopNavBar