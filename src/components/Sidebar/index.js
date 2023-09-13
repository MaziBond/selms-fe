import React, { useState, useContext, useEffect } from 'react';
import { UserDetails } from '../../Data';
import DashboardSvg from '../../svg/Dashboard';
import EmploySvg from '../../svg/Employee';
import DocSvg from '../../svg/DocSvg';
import Account from '../../svg/Account';
import SettingSvg from '../../svg/Setting';

import './index.scss';

const Sidebar = ({ setCurrentScreen }) => {
  const user = useContext(UserDetails);
  const { role } = user.userDetails; 
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [active, setActive] = useState('dashboard');
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const roleCheck = {
    "super admin": ['Dashboard', 'Employee', 'Documents', 'Account'],
    admin: ['Documents', 'Account', 'Employee'],
    manager: ['Documents', 'Account', 'Setting'],
    staff: ['Documents', 'Account', 'Setting'],
  };

  useEffect(() => {
    const checkRole = role === 'Super admin' ? 'Dashboard' : 'Account';
    setActive(checkRole.toLowerCase())
    setCurrentScreen(checkRole)
  }, []);

  return (
    <section className="sidebar">
      <button
        className="sidebar__top"
        onClick={toggleSidebar}
      >
        <h1 className="sidebar__title">HR</h1>
      </button>
      <ul className="sidebar__ul">
        {
          roleCheck[role.toLowerCase()]?.includes('Dashboard') && (
            <li 
              className={`sidebar__li ${active === "dashboard" ? "sidebar__li-active" : " "}`}
              onClick={() => {
              setActive('dashboard');
              setCurrentScreen('Dashboard');
            }
            }
          >
              <DashboardSvg active={active} />
              Dashboard
          </li>
            )
          }
          {
            roleCheck[role.toLowerCase()]?.includes('Employee') &&
            (
              <li 
                className={`sidebar__li ${active === "employee" ? "sidebar__li-active" : " "}`}
                onClick={() => {
                    setActive('employee')
                    setCurrentScreen('Employee');
                  }
                }
              >
                <EmploySvg active={active} />
                Employee
            </li>
            )
          }
          {
            roleCheck[role.toLowerCase()]?.includes('Documents') && 
            (
              <li 
                className={`sidebar__li ${active === "document" ? "sidebar__li-active" : " "}`}
                onClick={() => {
                    setActive('document')
                    setCurrentScreen('Documents');
                  }
                }
              >
                <DocSvg active={active} />
                Documents
            </li>
            )
          }

          {
            roleCheck[role.toLowerCase()]?.includes('Documents') && 
            (
              <li 
                className={`sidebar__li ${active === "account" ? "sidebar__li-active" : " "}`}
                onClick={() => {
                  setActive('account')
                  setCurrentScreen('Account');
                  }
                }
              >
                <Account active={active} />
                Account
            </li>
            )
          }

          
          {
            roleCheck[role.toLowerCase()].includes('Setting') && 
            (
              <li 
                className={`sidebar__li ${active === "setting" ? "sidebar__li-active" : " "}`}
                onClick={() => {
                  setActive('setting')
                  setCurrentScreen('Setting');
                  }
                }
              >
                <SettingSvg active={active} />
                Setting
              </li>
            )
          }
      </ul>
    </section>
  )
};

export default Sidebar;