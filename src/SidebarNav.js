import React, {useState} from 'react';
import * as MenuIconss from "react-icons/fa";
import * as AIIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {SidebarData } from './SidebarData';
import './Sidebar.css';
import {IconContext} from 'react-icons';

function SidebarNav() {
    const [sidebar, setSidebar] = useState(false);
    const showSiderbar =()=> setSidebar(!sidebar);
    
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
               <MenuIconss.FaBars onClick={showSiderbar}/>
           </Link>
       </div>
       <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
           <ul className='nav-menu-items'  onClick={showSiderbar}>
               <li className='navbar-toggle'>
                   <Link to='#' className='menu-bars'>
                   <AIIcons.AiFillCloseCircle/>
                   </Link>
               </li>
               {SidebarData.map((navitem, index) => {
                   return(
                       <li key={index} className={navitem.cName}>
                           <Link to={navitem.path}>
                               {navitem.icon}
                               <span>{navitem.title}</span>
                           </Link>
                       </li>
                   );
               })}
           </ul>
       </nav>
       </IconContext.Provider>
       </>
       
    )
}

export default SidebarNav
