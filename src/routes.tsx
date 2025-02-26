import React from 'react';
import { PiStudentBold } from 'react-icons/pi';
import { MdHome, MdLock, MdAddTask } from 'react-icons/md';
import { MdOutlineAppRegistration } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Attendence',
    layout: '/admin',
    path: '/attendence',
    icon: <MdAddTask />,
  },

  {
    name: 'My Student',
    layout: '/admin',
    path: '/mystudent',
    icon: <PiStudentBold />,
  },
  {
    name: 'Registration',
    layout: '/admin',
    path: '/registration',
    icon: <MdOutlineAppRegistration />,
  },
  {
    name: 'All Batches',
    layout: '/admin',
    path: '/batches',
    icon: <FaPeopleGroup />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
];
export default routes;
