import * as React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = (props) =>{
    return(
        <nav className="nav justify-content-center shadow p-3 mb-5 ">
            <NavLink className='mx-5 btn btn-primary' to='/'> Home</NavLink>
            <NavLink className='mx-5 btn btn-primary' to='/compose'> Compose</NavLink>
        </nav>
    )
}

interface NavBarProps {}

export default NavBar;