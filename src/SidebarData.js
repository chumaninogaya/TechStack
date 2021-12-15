import React from 'react';
import * as MenuIconss from "react-icons/fa";
import * as AIIcons from 'react-icons/ai';
import * as IOIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AIIcons.AiFillHome/>,
        cName: 'nav-text'

    },
    {
        title: 'Supplier Report',
        path: '/supplier',
        icon: <AIIcons.AiFillDatabase/>,
        cName: 'nav-text'

    },
    {
        title: 'Contractor Report',
        path: '/contractor',
        icon: <AIIcons.AiFillDatabase/>,
        cName: 'nav-text'

    }

];