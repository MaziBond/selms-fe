import React, { useState } from "react";
import DashLayout from '../DashLayout';
import Sidebar from '../Sidebar';

import './index.scss';

const Dashboards = () => {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  return (
    <section className="dashboard">
      <main className="dashboard__sidebar">
        <Sidebar setCurrentScreen={setCurrentScreen }/>
      </main>
      <main className="dashboard__layout">
        <DashLayout currentScreen={currentScreen} />
      </main>
    </section>
  )
};

export default Dashboards;
